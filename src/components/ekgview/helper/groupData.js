import moment from "moment";

export const groupByDate = async (dataToGroup, dateReference) => {
    const monthArray = Array(13 - 1).fill().map((_, index) => 1 + index);
    const groupedData = [];
    for(const month of monthArray){
        const monthData = dataToGroup.filter((groupData) => parseInt(moment(groupData.data[dateReference]).format('M')) === month);
        // console.log("ASD", monthData)
        const extractedData = dataExtractor(monthData);
        // console.log("ASD", extractedData)
        
        const monthObj = {[month]: extractedData}
        groupedData.push(monthObj);
    }
   return groupedData
}

const dataExtractor = (monthData) => {
    return monthData.map(data => data.data);
}

export const cumulativeGitCommitData = (groupCommitData) => {
    const gitStats = JSON.parse(JSON.stringify(groupCommitData));
    gitStats.map(commitData => {
        const value = Object.values(commitData).pop();
        const key = Object.keys(commitData).pop();
        const newValue = value.length > 0 ? value.map(value => value.stats) : [];
        commitData[key] = newValue;        
    });
    
    const gitCommitDataByMonth = [];
    gitStats.map(commitData => {
        let cumAdditions = 0;
        let cumDeletions = 0;
        let cumFiles = 0;
        const value = Object.values(commitData).pop();
        const key = Object.keys(commitData).pop();
        const totalCommits = value.length;
        if(totalCommits > 0){
            value.map(stat => {
                cumAdditions += stat.additions;
                cumDeletions += stat.deletions;
                cumFiles += stat.files;
            })
        }
        const gitCommitObj = {
            "index": parseInt(key), 
            averageFileChanged: totalCommits == 0 ? 0 : Math.round(cumFiles / totalCommits),
            filesChanged: cumFiles,
            averageAdditions: totalCommits == 0 ? 0 : Math.round(cumAdditions / totalCommits),
            averageDeletions: totalCommits == 0 ? 0 : Math.round(cumDeletions / totalCommits),
            totalCommits: totalCommits
        }
        gitCommitDataByMonth.push(gitCommitObj);

    })
    return gitCommitDataByMonth;
} 

export const latestSonarQubeData = (groupedSonarQubeData) => {
    const sonarQubeData = JSON.parse(JSON.stringify(groupedSonarQubeData));
    const sonarQubeLatestData = []
    sonarQubeData.map(data => {
        const key = Object.keys(data).pop();
        const value = Object.values(data).pop();
        const latestDataOfMonth = value.sort((a,b) => a.last_commit_date.localeCompare(b.last_commit_date));
        if(latestDataOfMonth.length > 0){
            const monthObj = {"index": parseInt(key), ...latestDataOfMonth.pop()}
            sonarQubeLatestData.push(monthObj)
        }
        else{
            const monthObj = {'index': parseInt(key),}
            sonarQubeLatestData.push(monthObj)
        }
    })

    return sonarQubeLatestData;
    
}

export const cumulativeJiraData = (groupedJiraIssueData) => {
    const jiraData = JSON.parse(JSON.stringify(groupedJiraIssueData));
    const cumuJiraData = [];
    jiraData.map(data => {
        const key = Object.keys(data).pop();
        const value = Object.values(data).pop();
        let totalResolutionHours = 0;
        const totalIssues = value.length;
        // console.log("VAL", value)
        value.map(jiraVal => {
            const resolutionTime = moment(jiraVal.resolution_date);
            const creationTime = moment(jiraVal.update_date)
            const resolveTime = Math.round(moment.duration(creationTime.diff(resolutionTime)).asHours());
            totalResolutionHours += resolveTime 
        })
        const monthObj = {
            'index': parseInt(key),
            'totalIssues': totalIssues,
            // 'totalResolveTime': totalResolutionHours,
            'averageTimePerIssue': totalIssues !== 0 ? Math.round(totalResolutionHours / totalIssues) : 0
            }
        
        cumuJiraData.push(monthObj)
    })
    return cumuJiraData;
}

export const mergeProjectData = (gitCommitData, sonarQubeData, jiraIssueData) => {
    const finalsonarQube = sonarQubeData.map(data => {
        return {
            "index": data.index,
            "codeSmells": data.code_smells ? data.code_smells : 0,
            "majorViolation": data.violations ? data.violations.major : 0,
            "criticalViolation": data.violations ? data.violations.critical : 0,
            "bugs": data.bugs ? data.bugs : 0 
        }
    });

    const mergedData = []
   
    for (let i=0; i < gitCommitData.length; i++ ){
        let mergedObj = {...gitCommitData[i], ...finalsonarQube[i], ...jiraIssueData[i]}
        mergedData.push(mergedObj);
    }

    return mergedData;
}
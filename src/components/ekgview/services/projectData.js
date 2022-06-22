import axios from "axios";
import { groupByDate, cumulativeGitCommitData, latestSonarQubeData, cumulativeJiraData, mergeProjectData } from "../helper/groupData";

export const getProjectIds = async () => {
    const baseUrl = `${process.env.REACT_APP_ADAPTER_HOST}/dataset/origins?type=project&page=1&pageSize=1000`;
    let response = await axios.get(baseUrl, {
        headers:{
            Authorization: `Basic ${process.env.REACT_APP_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    const projectIds = response.data.results.map((result) => result.id);
   return projectIds;
}

const createQueryUrl = (dataType, queryType, projectId, query) => {
    const baseUrl = `https://visdom.tlt-cityiot.rd.tuni.fi/dataset/${dataType}?type=${queryType}&page=1&pageSize=10000&query=origin.id==${projectId};${query}`
    return baseUrl;
}

export const getEkgData = async (projectId, year) => {
    const sonarQubeBaseUrl = createQueryUrl('events', 'sonar_measures', projectId, `data.last_commit_date~=${year}`);
   
    const sonarQubeData = await axios.get(sonarQubeBaseUrl, {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }).then(response => {
             return response.data.results
        }).catch(error => console.log(error))

    const groupedSonarQubeData = await groupByDate(sonarQubeData, 'last_commit_date');
    const latestSonarQube = latestSonarQubeData(groupedSonarQubeData);

    const gitCommitUrl = createQueryUrl('events', 'git_commit', projectId, `time~=${year}`)
    const gitCommitData = await axios.get(gitCommitUrl, {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }).then(response => {
             return response.data.results
        }).catch(error => console.log(error))
    const groupedCommitData = await groupByDate(gitCommitData, 'authored_date');
    const cumulativeGitCommit = cumulativeGitCommitData(groupedCommitData);


    const jiraIssueUrl = createQueryUrl('events', 'jira_issue', projectId, `state==Closed;data.resolution_date~=${year}`);
    const jiraIssueData = await axios.get(jiraIssueUrl, {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }).then(response => {
             return response.data.results
        }).catch(error => console.log(error))
    const groupedJiraIssueData = await groupByDate(jiraIssueData, 'resolution_date');
    const cumJiraData = cumulativeJiraData(groupedJiraIssueData);

   return mergeProjectData(cumulativeGitCommit, latestSonarQube, cumJiraData);   
}
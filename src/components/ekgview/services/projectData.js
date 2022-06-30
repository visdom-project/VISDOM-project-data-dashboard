// Copyright 2022 Tampere University
// This software was developed as a part of the VISDOM project: https://iteavisdom.org/
// This source code is licensed under the MIT license. See LICENSE in the repository root directory.
// Author(s): Duc Hong <duc.hong@tuni.fi>, Nhi Tran <thuyphuongnhi.tran@tuni.fi>, Sulav Rayamajhi<sulav.rayamajhi@tuni.fi>, Ville Heikkilä <ville.heikkila@tuni.fi>, Vivian Lunnikivi <vivian.lunnikivi@tuni.fi>

import axios from "axios";
import {
  groupByDate,
  cumulativeGitCommitData,
  latestSonarQubeData,
  cumulativeJiraData,
  mergeProjectData,
} from "../helper/groupData";

export const getProjectIds = async () => {
  const baseUrl = `${process.env.REACT_APP_ADAPTER_HOST}/origins?type=project&page=1&pageSize=1000`;
  let response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const projectIds = response.data.results.map((result) => result.id);
  return projectIds;
};

const createQueryUrl = (dataType, queryType, projectId, query) => {
  return `${process.env.REACT_APP_ADAPTER_HOST}/${dataType}?type=${queryType}&page=1&pageSize=10000&query=origin.id==${projectId};${query}`;
};

export const getEkgData = async (projectId, year) => {
  const sonarQubeBaseUrl = createQueryUrl(
    "events",
    "sonar_measures",
    projectId,
    `data.last_commit_date~=${year}`
  );

  const sonarQubeData = await axios
    .get(sonarQubeBaseUrl, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => console.log(error));

  const groupedSonarQubeData = await groupByDate(
    sonarQubeData,
    "last_commit_date"
  );
  const latestSonarQube = latestSonarQubeData(groupedSonarQubeData);

  const gitCommitUrl = createQueryUrl(
    "events",
    "git_commit",
    projectId,
    `time~=${year}`
  );
  const gitCommitData = await axios
    .get(gitCommitUrl, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => console.log(error));
  const groupedCommitData = await groupByDate(gitCommitData, "authored_date");
  const cumulativeGitCommit = cumulativeGitCommitData(groupedCommitData);

  const jiraIssueUrl = createQueryUrl(
    "events",
    "jira_issue",
    projectId,
    `state==Closed;data.resolution_date~=${year}`
  );
  const jiraIssueData = await axios
    .get(jiraIssueUrl, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => console.log(error));
  const groupedJiraIssueData = await groupByDate(
    jiraIssueData,
    "resolution_date"
  );
  const cumJiraData = cumulativeJiraData(groupedJiraIssueData);

  return mergeProjectData(cumulativeGitCommit, latestSonarQube, cumJiraData);
};

// Copyright 2022 Tampere University
// This software was developed as a part of the VISDOM project: https://iteavisdom.org/
// This source code is licensed under the MIT license. See LICENSE in the repository root directory.
// Author(s): Duc Hong <duc.hong@tuni.fi>, Nhi Tran <thuyphuongnhi.tran@tuni.fi>, Sulav Rayamajhi<sulav.rayamajhi@tuni.fi>, Ville Heikkilä <ville.heikkila@tuni.fi>, Vivian Lunnikivi <vivian.lunnikivi@tuni.fi>

/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  FlexibleWidthXYPlot,
  YAxis,
  LineSeries,
  AreaSeries,
  Hint,
} from "react-vis";
import "../../../../node_modules/react-vis/dist/style.css";
import { getCurveType, extractData } from "../helper/integratedDataProject";

const VisGraphProjectData = ({
  data,
  configs,
  displayedMonth,
  compress,
  pulseRatio,
}) => {
  const dataInTimeframe = data.filter(
    (month) =>
      month.index < displayedMonth[1] + 1 &&
      month.index >= displayedMonth[0] - 1
  );
  const segments = extractData(dataInTimeframe, configs, compress, pulseRatio);
  const [hintTooltipValue, setHintTooltipValue] = useState(false);

  const tickValues = [];
  for (let i = displayedMonth[0]; i <= displayedMonth[1]; i++) {
    tickValues.push(i);
  }

  return (
    pulseRatio !== 0 && (
      <FlexibleWidthXYPlot height={500}>
        <VerticalGridLines />
        <HorizontalGridLines />
        {compress ? <XAxis tickValues={tickValues} /> : null}
        <YAxis />
        {hintTooltipValue && <Hint value={hintTooltipValue} />}
        {segments.map((segment, index) => {
          const Series =
            segment.colorFilled === "#ffffff" ? LineSeries : AreaSeries;
          const monthData = data[segment.index - 1];
          const dataTooltip = {
            Month: monthData.index,
            "Average additions": monthData.averageAdditions,
            "Average deletions": monthData.averageDeletions,
            "Average files changed": monthData.averageFileChanged,
            "Average time per issue": monthData.averageTimePerIssue,
            Bugs: monthData.bugs,
            "Code smells": monthData.codeSmells,
            "Critical violation": monthData.criticalViolation,
            "Major violation": monthData.majorViolation,
            "Total issues": monthData.totalIssues,
            // "Total resolve time": monthData.totalResolveTime,
            "Total commits": monthData.totalCommits,
          };

          const segmentProps = {
            data: segment.data,
            color: segment.color,
            fill:
              segment.colorFilled === "#ffffff" ? null : segment.colorFilled,
            curve: getCurveType(segment.shape),
            // onSeriesMouseOver: (e) => setHintTooltipValue({ ...dataTooltip, x: segment.index + 1, y: 0 }),
            onSeriesMouseOver: () =>
              setHintTooltipValue({
                ...dataTooltip,
                x: segment.data[0].x + 1,
                y: 0,
              }),

            onSeriesMouseOut: () => setHintTooltipValue(false),
          };
          return <Series key={`segment-${index}`} {...segmentProps} />;
        })}
      </FlexibleWidthXYPlot>
    )
  );
};

export default VisGraphProjectData;

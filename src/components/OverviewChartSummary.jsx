import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import default styles
import './OverviewChartSummary.css'; // Import custom styles

const OverviewChartSummary = ({ percentage }) => {
  return (
    <div className="chart-container">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: '#000', // Black color for the progress bar path
          textColor: '#000', // Black color for the text
          trailColor: '#c4d047', // Grey color for the trail
          textSize: '20px', // Font size of the text
        })}
      />
    </div>
  );
}

export default OverviewChartSummary;

import MUICircularProgress from '@material-ui/core/CircularProgress';

import "./CircularProgress.scss";

type CircularProgressProps = {
  margin?: string,
  color?: string,
  size?: string,
}

const CircularProgress: React.FC<CircularProgressProps> = ({ margin, color, size = "32px" }) => {
  return <MUICircularProgress
    className="CustomCircularProgress"
    size={size}
    style={{ margin, color }}
  />
}

export default CircularProgress;
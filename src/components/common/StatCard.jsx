import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

export default function StatCard({ icon: Icon, label, value, trend, trendValue, color = 'blue' }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className={`stat-icon ${color}`}>
        <Icon />
      </div>
      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {trendValue && (
          <div className={`stat-trend ${trend}`}>
            {trend === 'up' && <FiTrendingUp />}
            {trend === 'down' && <FiTrendingDown />}
            {trend === 'stable' && <FiMinus />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Category Card Component
const CategoryCard = ({ 
  icon: Icon, 
  iconBgColor, 
  iconColor, 
  title, 
  description,
  badgeText,
  badgeColor,
  badgeBgColor
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className={`w-14 h-14 rounded-full ${iconBgColor} flex items-center justify-center mb-4`}>
      <Icon className={iconColor} size={20} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">
      {description}
    </p>
    <div className={`mt-4 py-2 px-4 ${badgeBgColor} rounded-lg ${badgeColor} inline-block`}>
      {badgeText}
    </div>
  </div>
);

export default CategoryCard;
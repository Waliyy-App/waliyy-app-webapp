// Reusable Resource Column Component
const ResourceColumn = ({
  Icon,
  iconBgColor,
  iconColor,
  title,
  children,
  button,
}) => (
  <div className="bg-[#2D133A] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${iconBgColor} mr-3`}>
          <Icon className={iconColor} size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>

      {children}

      {button}
    </div>
  </div>
);

export default ResourceColumn;
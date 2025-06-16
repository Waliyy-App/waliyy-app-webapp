// Reusable Founder Bio Component
const FounderBio = ({ 
  imageSrc, 
  title, 
  bio, 
  imageOnLeft = true,
  gradientFrom,
  gradientTo
}) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 flex flex-col md:flex-row ${imageOnLeft ? '' : 'md:flex-row-reverse'} items-center gap-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}>
    <div className="md:w-1/4 flex justify-center">
      <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105`}>
        <img 
          src={imageSrc} 
          alt="Founder" 
          className="w-full h-full border-2 border-dashed rounded-full" 
        />
      </div>
    </div>
    <div className="md:w-3/4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {bio}
      </p>
    </div>
  </div>
);

export default FounderBio;
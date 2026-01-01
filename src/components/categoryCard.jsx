export default function CategoryCard({ name, image, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group w-full h-full"
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-cover group-hover:scale-105 transition"
        />
      )}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>
    </button>
  )
}

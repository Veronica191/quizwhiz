export default function CategoryCard({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow hover:bg-green-500 hover:text-white transition"
    >
      {name}
    </button>
  )
}

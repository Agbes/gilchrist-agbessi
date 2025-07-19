export default function Header() {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-72">
        <input
          type="text"
          placeholder="Rechercher..."
          className="flex-1 outline-none text-sm"
        />
        <i className="text-gray-500">🔍</i>
      </div>
    </div>
  )
}

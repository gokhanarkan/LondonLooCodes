export default function Directory({ codes }) {
  return (
    <nav className="h-full overflow-y-auto" aria-label="Directory">
      <ul className="relative z-0 divide-y divide-gray-200">
        {codes.map((code) => (
          <li key={code._id} className="bg-white">
            <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
              <div className="flex-1 min-w-0">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  {code.name} ({code.rough_location})
                </p>
                <p className="text-sm text-gray-500 truncate">{code.address}</p>
                <p className="text-sm text-gray-500 truncate">
                  <b>Code:</b> {code.code}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Accessible: {code.accessible}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Gender Neutral: {code.gender_neutral}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

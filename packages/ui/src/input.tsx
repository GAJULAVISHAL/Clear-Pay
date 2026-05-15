"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label,
    className = ""
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    className?: string
}) => {
    return <div className="pt-2 w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5`} placeholder={placeholder} />
    </div>
}
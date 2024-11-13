import { FiSearch } from "react-icons/fi";

const SearchInput = ({
	placeholder,
	search,
	setSearch,
	searchId,
}: Partial<{
	placeholder: string;
	search: string;
	searchId: string;
	setSearch: any;
}>) => {
	return (
		<div>
			<div className="relative bg-[#f7f7f7] h-10 w-full">
				<FiSearch size={25} color="#777E90" className="absolute top-2 left-5" />
				<input
					style={{
						border: "1px solid #E2E8F0",
					}}
					type="search"
					name="search"
					id={searchId || "SearchNew"}
					placeholder={placeholder}
					className="w-full text-sm pl-14 text-[#777E90] h-full bg-transparent rounded-lg placeholder:capitalize"
					value={search}
					onChange={e => setSearch(e?.target?.value)}
				/>
			</div>
		</div>
	);
};

export default SearchInput;

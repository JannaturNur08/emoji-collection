const Emoji = ({ emoji }) => {
	const { emoji_name, emoji_hex_code } = emoji;
	console.log(emoji);
	return (
		<div className=" p-10  bg-[#F5F9FF] hover:z-10 border-2 shadow-md rounded-3xl border-white hover:scale-125 hover:shadow-2xl relative transition-transform">
			<div className="mt-5">
				<span
					role="img"
					aria-label={emoji_name}
					className="lg:text-7xl transition-transform transform duration-300 border-white text-2xl "
					title={`Click to copy ${emoji_name} (${emoji_hex_code})`}
					onClick={() => {
						
						navigator.clipboard.writeText(emoji_hex_code);
					}}>
					{emoji_hex_code}
				</span>
			</div>
			<div className="absolute inset-0 flex pt-2  justify-center opacity-0 hover:opacity-100 transition-opacity transform duration-300">
				<p className="lg:text-xl font-bold">{emoji_name}</p>
			</div>
		</div>
	);
};

export default Emoji;

import { useEffect } from "react";
import { useState } from "react";
import Emoji from "../emoji/emoji";
import Swal from "sweetalert2";

const Emojis = () => {
	const [emojis, setEmojis] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedEmoji, setSelectedEmoji] = useState(null);

	// Fetch emoji data
	useEffect(() => {
		fetch("emojis.json")
			.then((res) => res.json())
			.then((data) => setEmojis(data));
	}, []);

	// Filter emojis based on search
	const filteredEmojis = emojis.filter((emoji) =>
		emoji.emoji_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleClick = (emoji) => {
		setSelectedEmoji(emoji);
	};

	return (
		<div className="flex" >
			{/* Left side: Search bar and Emoji Grid */}
			<div className="flex-1">
				<div className="form-control mt-10 mb-10 relative">
					<div className="input-group">
						<div className="relative w-full">
							<input
								type="search"
								placeholder="Search…"
								className="w-full focus:border-blue-500 focus:outline-none px-10 py-3 rounded-full pl-16 border-2 shadow-inner bg-[#F5F9FF] border-white"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<button className="btn btn-square">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-gray-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-10">
					<div className="grid lg:grid-cols-4 lg:gap-8 grid-cols-2 flex-1">
						{filteredEmojis.map((emoji, idx) => (
							<div
								key={idx}
								className="cursor-pointer"
								onClick={() => handleClick(emoji)}>
								<Emoji emoji={emoji}></Emoji>
							</div>
						))}
					</div>
                    
						
						<div className="grid-cols-2">
                        {selectedEmoji && (
                            <div className="w-[400px] aspect-square">
                                {/* Right side: Display selected emoji card */}
							<div className=" border-2 border-white rounded-2xl p-12">
								<h2 className="text-2xl font-bold mb-4">
									Selected Emoji
								</h2>
								<div>
									<span
										role="img"
										aria-label={selectedEmoji.emoji_name}
										className="lg:text-9xl transition-transform transform duration-300 border-white text-2xl"
										title={`Click to copy ${selectedEmoji.emoji_name} (${selectedEmoji.emoji_hex_code})`}>
										{selectedEmoji.emoji_hex_code}
									</span>
									<p className="mt-2">
										{selectedEmoji.emoji_name}
									</p>
								</div>
								<button
									className="btn btn-primary bg-[#FD8847] px-5 py-2 rounded-lg mt-2 w-full hover:shadow-xl"
									onClick={() => {
										// Logic to copy emoji_hex_code to clipboard
										navigator.clipboard
											.writeText(
												selectedEmoji.emoji_hex_code
											)
											.then(() => {
												Swal.fire({
													title: "Copied!",
													text: `Click to copy ${selectedEmoji.emoji_name} (${selectedEmoji.emoji_hex_code})`,

													imageWidth: 400,
													imageHeight: 200,
													imageAlt: "Custom image",
												});
											});
									}}>
									Copy Hex_code
								</button>
							</div>
                            </div>
						)}
                        </div>
					
                    </div>
					
				</div>
			</div>
           
		
	);
};

export default Emojis;

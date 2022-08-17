import React, { useState, useEffect } from "react";

function useFetchPics(searchParam) {
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (searchParam) {
			setLoading(true);
            setError(null);
			fetch(`https://api.pexels.com/v1/search?query=${searchParam}&page=1&per_page=4`, {
				method: "GET",
				mode: "cors",
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_PEXELS_API}`,
				},
			})
				.then((res) => res.json())
				.then((jsonRes) => setResults(jsonRes))
				.catch((err) => setError(err))
				.finally(() => setLoading(false));
		}
	}, [searchParam]);

	return [results, loading, error];
}

export default useFetchPics;

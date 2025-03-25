import React, { createContext, useState } from 'react';
import { TTrackContext } from '~/types/misc';

export const TrackContext = createContext<
	| {
			trackContext: TTrackContext | undefined;
			setTrackContext: React.Dispatch<
				React.SetStateAction<TTrackContext | undefined>
			>;
	  }
	| undefined
>(undefined);

export const TrackProvider = ({ children }: { children: React.ReactNode }) => {
	const [trackContext, setTrackContext] = useState<TTrackContext | undefined>(
		undefined
	);

	return (
		<TrackContext.Provider value={{ trackContext, setTrackContext }}>
			{children}
		</TrackContext.Provider>
	);
};

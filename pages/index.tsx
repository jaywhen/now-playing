import useSWR from "swr";
import Image from "next/image";
import { ISpotifyData } from "@/interfaces/playing.interface";
import { SetStateAction, useEffect, useRef, useState } from "react";
import PlayingBar from "./components/playing-bar";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR<ISpotifyData>("/api/now-playing", fetcher);
  const songNameRef = useRef<HTMLAnchorElement>(null);
  const [songNameExtraStyle, setSongNameExtraStyle] = useState("");
  const artistsNameRef = useRef<HTMLDivElement>(null);
  const [artistsNameExtraStyle, setArtistsNameExtraStyle] = useState("");

  const setExtraTrackTXTStyle = (
    txtRef: HTMLDivElement | HTMLAnchorElement | null,
    txtStyleSetter: (value: SetStateAction<string>) => void
  ): void => {
    if (!txtRef) return;

    const txtWidth = Math.round(txtRef.getBoundingClientRect().width);

    if (txtWidth > 150) {
      txtStyleSetter("animate-move-txt");
    } else {
      txtStyleSetter("self-end");
    }
  };

  useEffect(() => {
    if (data) {
      setExtraTrackTXTStyle(songNameRef.current, setSongNameExtraStyle);
      setExtraTrackTXTStyle(artistsNameRef.current, setArtistsNameExtraStyle);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {data?.isPlaying ? (
        <div className="w-[390px] h-[240px] p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div className="w-[170px] h-[170px]">
            <Image
              className="rounded-md w-full h-full"
              width={170}
              height={170}
              src={data.albumImageUrl}
              alt="cover"
            />
          </div>
          <div className="h-[170px] w-[150px] flex flex-col justify-between">
            <div className="w-full flex flex-col gap-1 self-end overflow-hidden">
              <a
                ref={songNameRef}
                href={data.songUrl}
                className={`${songNameExtraStyle} track-text font-bold text-[32px] transition-opacity duration-500 hover:opacity-60`}
                title={data.title}
                target="_blank"
              >
                {data.title}
              </a>
              <div
                ref={artistsNameRef}
                className={`${artistsNameExtraStyle} track-text text-xl text-slate-800`}
                title={data.artist}
              >
                {data.artist}
              </div>
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              <PlayingBar />
              <div className="flex self-end">
                <Image
                  src="/spotify.png"
                  alt="spotify"
                  width={24}
                  height={24}
                />
                <div className="text-base font-bold">Spotify</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>not playing</div>
      )}
    </div>
  );
}

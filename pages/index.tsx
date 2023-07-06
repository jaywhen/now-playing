import useSWR from "swr";
import Image from "next/image";
import { ISpotifyData } from "@/interfaces/playing.interface";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR<ISpotifyData>("/api/now-playing", fetcher);

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
            <div className="w-full flex flex-col gap-1 self-end">
              <a
                href={data.songUrl}
                className="w-full text-end font-bold text-[32px] self-end truncate transition-opacity duration-500 hover:opacity-60"
                title={data.title}
                target="_blank"
              >
                {data.title}
              </a>
              <div
                className="w-full text-end text-xl self-end text-slate-800 truncate"
                title={data.artist}
              >
                {data.artist}
              </div>
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              <div className="flex items-center">
                <div className="playing-bar animate-playing bar-left"></div>
                <div className="playing-bar animate-playing bar-mid"></div>
                <div className="playing-bar animate-playing bar-right"></div>
              </div>
              <div className="flex self-end">
                <Image src="/spotify.png" alt="spotify" width={24} height={24} />
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

import useSWR from "swr";
import { ISpotifyData } from "./api/now-playing";
import Image from "next/image";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR<ISpotifyData>("/api/now-playing", fetcher);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {data?.isPlaying ? (
        <div className="w-[390px] h-[240px] p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div className="w-[170px] h-[170px]">
            <img
              className="rounded-md w-full h-full"
              src={data.albumImageUrl}
              alt="cover"
            />
          </div>
          <div className="h-[170px] w-[150px] flex flex-col justify-between">
            <div className="w-full flex flex-col gap-1 self-end">
              <div
                className="font-bold text-[32px] self-end truncate"
                title={data.title}
              >
                {data.title}
              </div>
              <div
                className="text-xl self-end text-slate-800 truncate"
                title={data.artist}
              >
                {data.artist}
              </div>
            </div>
            <div className="flex self-end">
              <Image src="/spotify.png" alt="spotify" width={24} height={24} />
              <div className="text-base font-bold">Spotify</div>
            </div>
          </div>
        </div>
      ) : (
        <div>not playing</div>
      )}
    </div>
  );
}

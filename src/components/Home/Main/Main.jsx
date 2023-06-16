import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import mainBG from '../../../../public/main-bg.png';
import Image from 'next/image';

export default function Main() {
    return (
        <main className="relative flex items-center justify-center select-none text-center md:text-left">
            <Image
                priority={100}
                alt="main-bg"
                src={mainBG}
                className=" w-screen h-[500px] sm:h-[600px] lg:min-h-[700px] 2xl:h-[72vh] object-cover object-left md:object-center"
            />
            <PaddingContainer className="h-full absolute flex items-center w-full p-8">
                <div className="z-10 flex items-center w-full h-full">
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="font-bold text-5xl 2xl:text-[6vh] 2xl:leading-[6vh] mb-4">
                            Shopping And Department Store.
                        </h2>
                        <h2 className="text-lg 2xl:text-[2vh] 2xl:leading-[4vh]">
                            Shopping is a bit of a relaxing hobby for me, which
                            is sometimes troubling for the bank balance.
                        </h2>
                    </div>
                    <div className="z-10 flex-1 hidden md:block"></div>
                </div>
            </PaddingContainer>
        </main>
    );
}

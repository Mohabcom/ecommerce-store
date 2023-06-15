import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';

export default function ParallaxBanner() {
    return (
        <section className="parallax flex items-center justify-center 2xl:h-[40vh] 2xl:min-h-[700px]">
            <PaddingContainer className="select-none text-center md:text-left w-full h-full flex items-center justify-center text-white">
                <div className="hidden md:block grow"></div>
                <div className="hidden md:block grow"></div>
                <div className="flex flex-col items-center justify-center flex-1 bg-green-700 p-8 lg:p-16 w-1/3 shrink mx-6 my-16">
                    <h2 className="font-bold text-5xl lg:text-6xl mb-4">
                        Get 5% Cash Back On $200
                    </h2>
                    <h2 className="text-lg mb-10">
                        Shopping is a bit of a relaxing hobby for me, which is
                        sometimes troubling for the bank balance.
                    </h2>
                    <button className="text-xl border-2 self-center lg:self-start border-white rounded-full px-5 py-3 hover:bg-green-900 transition-all">
                        Learn More
                    </button>
                </div>
            </PaddingContainer>
        </section>
    );
}

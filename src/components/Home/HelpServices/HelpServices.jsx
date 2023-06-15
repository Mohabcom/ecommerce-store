import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import Image from 'next/image';
import firstimg from '../../../../public/helpServices/faq.png';
import secondimg from '../../../../public/helpServices/online-payment.png';
import thirdimg from '../../../../public/helpServices/home delivery.png';

const HelpServicesData = [
    {
        title: 'Frequently Asked Questions',
        desc: 'Updates on safe Shopping in our Stores',
        image: firstimg,
    },
    {
        title: 'Online Payment Process',
        desc: 'Updates on safe Shopping in our Stores',
        image: secondimg,
    },
    {
        title: 'Home Delivery Options',
        desc: 'Updates on safe Shopping in our Stores',
        image: thirdimg,
    },
];

export default function HelpServices() {
    return (
        <section>
            <PaddingContainer className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                    Services To Help You Shop
                </h2>

                <div className="flex flex-wrap gap-4 items-center justify-center lg:h-[500px] md:px-4">
                    {HelpServicesData.map((service, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full sm:w-1/3 h-full lg:w-1/4 grow rounded-lg flex flex-col items-center justify-center overflow-hidden bg-gray-200"
                            >
                                <div className="w-full h-full grow p-12">
                                    <h3 className="font-bold text-2xl text-gray-800">
                                        {service.title}
                                    </h3>
                                    <p className="my-2 text-lg w-2/3 leading-tight font-semibold text-gray-600">
                                        {service.desc}
                                    </p>
                                </div>
                                <div className="w-full h-full grow bg-red-200">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PaddingContainer>
        </section>
    );
}

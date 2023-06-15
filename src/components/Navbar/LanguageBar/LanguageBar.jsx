import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import Link from 'next/link';
import { AiOutlineDown } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';

export default function LanguageBar() {
    return (
        <div className="bg-green-700 h-[28px] text-white text-sm">
            <PaddingContainer className="flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-2">
                    <BsTelephone />
                    +0012345678910
                </div>
                <div className="hidden lg:flex gap-4">
                    <div>Get 50% Off on Selected Items</div>
                    <div>|</div>
                    <div>
                        <Link href="/">Shop Now</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4 lg:gap-16">
                    <button className="flex items-center gap-2">
                        Eng <AiOutlineDown />
                    </button>
                    <button className="flex items-center gap-2">
                        Location <AiOutlineDown />
                    </button>
                </div>
            </PaddingContainer>
        </div>
    );
}

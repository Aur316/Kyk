import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from "next/router";

// @ts-ignore
import en_locale from '/locales/en-US.json';
// @ts-ignore
import es_locale from '/locales/es-ES.json';


export const Footer: NextPage = () => {
    const locales: any = {
        'en-US': en_locale,
        'es-ES': es_locale
    }

    const {locale} = useRouter();
    const t = locales[locale || 'en-US'];

    return (
        <div id='contact' className='w-full px-4 lg:px-16 py-4 lg:py-8 flex flex-col lg:flex-row justify-between items-center lg:items-center text-white font-bold'>
            <Link href='/'>
                <div className='flex flex-row justify-center items-center cursor-pointer'>
                    <Image src="/kykeon_icon.png" alt="kykeon Logo" width={78} height={72} />
                </div>
            </Link>
            <p className='text-center' dangerouslySetInnerHTML={{__html: t["home_contact_description"]}}/>
            <div>
                © 2021 All rights reserved.
            </div>
        </div>
    );
};

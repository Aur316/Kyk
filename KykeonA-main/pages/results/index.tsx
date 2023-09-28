import { Spin } from 'antd';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

// @ts-ignore
import en_locale from '/locales/en-US.json';
// @ts-ignore
import es_locale from '/locales/es-ES.json';

const Results: NextPage<any> = () => {
    const locales: any = {
        'en-US': en_locale,
        'es-ES': es_locale,
    };

    const { locale } = useRouter();
    const t = locales[locale || 'en-US'];

    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <>
                <Head>
                    <title>Kykeon Analytics</title>
                    <meta name="description" content="Kykeon Analytics"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Header sticky={true}/>
                <main
                    className="flex flex-col justify-center items-center"
                    style={{ minHeight: '70vh' }}
                >
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="flex justify-center items-center h-full">
                            <Spin size="large"/>
                        </div>
                    </div>
                </main>
                <Footer/>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Kykeon Analytics</title>
                <meta name="description" content="Kykeon Analytics"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header sticky={true}/>
            <main
                className="flex flex-col justify-center items-center"
                style={{ minHeight: '80vh' }}
            >
                <div className="max-w-screen-2xl mx-auto ">
                    <div className="px-8 lg:px-16 pt-8 lg:pt-16 text-white">
                        <div className="font-bold text-6xl text-center">
                            {t['results_disclaimer_title']}
                        </div>
                        <br/>
                        <div className="w-48 border-2 border-solid border-accent-8 mx-auto"/>
                        <br/>
                        <br/>
                    </div>
                    <p className="px-8 lg:px-16">
                        {t['results_disclaimer_description']}
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="">
                            <div className="w-full flex flex-col lg:flex-row justify-center">
                                <Link href="/results/ethnobotanicals">
                                    <div
                                        className="text-center special-ethnobotanicals-btn px-8 py-4 my-4 bg-accent-8 text-white font-bold transition-all duration-75 ease-in cursor-pointer text-xl shadow-xl rounded-lg lg:w-1/4 lg:mx-8 whitespace-nowrap"
                                        onClick={() => setLoading(true)}
                                    >
                                        <Image
                                            className="rounded-lg"
                                            src="/plants.png"
                                            alt="Plants"
                                            width={150}
                                            height={150}
                                        />
                                        <br/>
                                        {t['results_disclaimer_ethnobotanicals']} &nbsp; →
                                    </div>
                                </Link>
                                <Link href="/results/classic">
                                    <div
                                        className="text-center special-classic-btn px-8 py-4 my-4 bg-accent-8 text-white font-bold transition-all duration-75 ease-in cursor-pointer text-xl shadow-xl rounded-lg lg:w-1/4 lg:mx-8 whitespace-nowrap"
                                        onClick={() => setLoading(true)}
                                    >
                                        <Image
                                            className="rounded-lg"
                                            src="/chemicals.png"
                                            alt="Plants"
                                            width={150}
                                            height={150}
                                        />
                                        <br/>
                                        {t['results_disclaimer_classic']} &nbsp; →
                                    </div>
                                </Link>
                            </div>
                            <br/>
                            <br/>
                            <Link href="/">
                                <div
                                    className="text-center bg-red-700 px-8 py-4 my-4 text-white font-bold transition-all duration-75 ease-in cursor-pointer text-xl shadow-xl rounded-lg lg:w-1/4 mx-auto whitespace-nowrap"
                                    onClick={() => setLoading(true)}
                                >
                                    {t['results_disclaimer_decline']}
                                </div>
                            </Link>
                        </div>
                        <br/>
                        <br/>
                    </p>
                </div>
            </main>

            <Footer/>
        </>
    );
};

export default Results;

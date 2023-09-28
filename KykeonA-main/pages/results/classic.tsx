import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import Link from 'next/link';
import {
    useEffect,
    useState,
} from 'react';
import {
    Table,
    Input,
    Tooltip,
    Popover,
    Tabs,
    Spin,
} from 'antd';
import {
    ArrowRightOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

import type {
    ColumnsType,
    FilterValue,
    SorterResult,
} from 'antd/lib/table/interface';
import type { TableProps } from 'antd';
import { useRouter } from 'next/router';
import useGoogleSheets from 'use-google-sheets';

// @ts-ignore
import en_locale from '/locales/en-US.json';
// @ts-ignore
import es_locale from '/locales/es-ES.json';
import GoogleSheetsMapper from 'google-sheets-mapper';
import { get_image_link } from '../../utils/contentful';
import { useFetch } from '../../utils/hooks';

const PUBCHEM_CID_URL =
    'https://pubchem.ncbi.nlm.nih.gov/rest/pug/concepts/name/JSON?name=';

const AVAILABLE_PSYCHONAUTWIKI_SUBSTANCES = [
    '5-apdi',
    'iap',
    'methaqualone',
    'ludes',
    'quaaludes',
    'qualudes',
    'mandrax',
    'alprazolam',
    'xanax',
    'prazolam',
    'ksalol',
    'niravam',
    '4-ho-dpt',
    '4hodpt',
    '4-hydroxy-n',
    'n-dipropyltryptamine',
    'benzydamine',
    'tantum',
    'aspirin',
    'acetylsalicylate',
    'a-pihp',
    'pihp',
    'hot-2',
    'hot2',
    'mebroqualone',
    'mbq',
    '4-epd',
    '4-ethylpentedrone',
    'yopo',
    'anadenanthera',
    'anadenanthera',
    '    diazepam',
    'valium',
    '2c-c',
    '2cc',
    'psilocin',
    '4-ho-dmt',
    '4-oh-dmt',
    '2-fa',
    '2-fluoroamphetamine',
    '2-fmp',
    '2fa',
    'lsd',
    'lsd-25',
    'acid',
    'cid',
    'lucy',
    'dom',
    'stp',
    'ethylone',
    'bk-mdea',
    'ayahuasca',
    'pharmahuasca',
    'yage',
    'oxazepam',
    'serax',
    'methamphetamine',
    'meth',
    'desoxyn',
    'tik',
    '4-emc',
    '4-ethylmethcathinone',
    '4-aco-dalt',
    '4acodalt',
    'a-pvt',
    'apvt',
    'ketobemidone',
    'kbd',
    'cyclobenzaprine',
    'flexeril',
    'apo-cyclobenzaprin',
    'fexmid',
    'novo-cycloprine',
    'adderall',
    'aderal',
    'aderall',
    'adderal',
    'd-amphetamine',
    'd-amph',
    'mbdb',
    'eden',
    'methyl-j',
    'ept',
    'ethylpropyltryptamine',
    'n,n-ethylpropyltryptamine',
    'huperzine-a',
    'h-a',
    '4-chlorodiazepam',
    'ro5-4864',
    '4-chlorodiazepam',
    '    2-pta',
    '4-methyl-2-pa',
    '2-(p-tolyl)acetamide',
    '2c-t',
    '2ct',
    '2-dpmp',
    'desoxypipradrol',
    '2dpmp',
    '2-desoxypiperadol',
    'desoxypipradol',
    '3-fa',
    '3fa',
    '2-methyl-2-butanol',
    '2m2b',
    'piracetam',
    'nootropil',
    'lucetam',
    'noostan',
    'breinox',
    'oikamid',
    'geratam',
    'biotropil',
    'met',
    'methylethyltryptamine',
    '3-ho-pcp',
    '3hopcp',
    '25ip-nbome',
    '25ip',
    'pentobarbital',
    'nembutal',
    'novopentobarb',
    'clonidine',
    'catapres',
    'kapvay',
    'duraclon',
    'pentazocine',
    'talwin',
    'nitemazepam',
    '3-hydroxynimetazepam',
    '4-ho-mipt',
    '4homipt',
    'homipt',
    'ho-mipt',
    '4-ho',
    'miprocin',
    'hot-7',
    'hot7',
    '2c-t-2',
    '2ct2',
    'flutoprazepam',
    'restas',
    'rolicyclidine',
    'pcpy',
    'ethylphenidate',
    'eph',
    '2-mppp',
    'n-piperidinecathinone',
    'sinicuichi',
    'sini',
    'shrubby-yellowcrest',
    'sun-opener',
    'heimia-salicifolia',
    'willow-leaf-heimia',
    '4-fmc',
    '4-fluoromethcathinone',
    'fpephedrone',
    'flephedrone',
    '4fmc',
    'diphenidine',
    'dpd',
    '2c-g',
    '2cg',
    '4-aco-det',
    'ethacetin',
    'ethylacybin',
    '4-acetoxy-det',
    '25h-nbome',
    '25h',
    '25-h-nbome',
    'zolpidem',
    'ambien',
    'stilnox',
    'hydrocodone',
    'vicodin',
    'hydro',
    'butyrfentanyl',
    'bf',
    'b-f',
    '5-mapb',
    '5mapb',
    'pregabalin',
    'lyrica',
    'pcp',
    'angeldust',
    'phencyclidine',
    'angel',
    'dust',
    'angel_dust',
    'wet',
    '5-htp',
    '5htp',
    '5-hydroxytryptophan',
    'tryptophan',
    'l-tryptophan',
    'oxitriptan',
    'mbzp',
    'methylbenylpiperazine',
    'bromo-dragonfly',
    'bromo-d-fly',
    'bdfly',
    'bromo-dragon-fly',
    'dob-dragonfly',
    '5f-akb48',
    '5f-apinaca',
    '5fapinaca',
    '5fakb48',
    'tramadol',
    'tram',
    'tetrahydrofuran-fentanyl',
    'thf-f',
    'thff',
    'bromadol',
    'bdpc',
    'desmethylflunitrazepam',
    'fonazepam',
    'ro05-4435',
    'norflunitrazepam',
    'mk-801',
    'dizocilpine',
    'mk801',
    'delorazepam',
    'nordiclazepam',
    'propofol',
    'milk-of-amnesia',
    'diprivan',
    'alcohol',
    'etoh',
    'beer',
    'ethanol',
    'booze',
    'hooch',
    'pv-8',
    'a-phpp',
    'baclofen',
    'gablofen',
    'methoxyketamine',
    '2-meo-ketamine',
    'amfonelicacid',
    'aa',
    'afa',
    'win25978',
    'rilmazafone',
    'rhythmy',
    '4-fluoromethylphenidate',
    '4f-mph',
    '4-fmph',
    '4fmph',
    '4-fl-mph',
    '4-fluoro-mph',
    '5-iai',
    '5iai',
    '3-ho-pce',
    '3hopce',
    'etizolam',
    'etiz',
    'etizest',
    'etilaam',
    'sedekopan',
    'depas',
    'etizola',
    'inxity',
    'zoly',
    'lamet',
    'towa',
    'deschloroetizolam',
    'etizolam-2',
    '4-meo-butryfentanyl',
    '4-meo-bf',
    '5-methyl-bk-mdea',
    '5-methyl-ethylone',
    '5-me',
    'nimetazepam',
    'erimin',
    'clorazepate',
    'tranxene',
    'novo-clopate',
    'tranzene',
    'tiletamine',
    'telazol',
    'methedrone',
    'bk-pmma',
    'palfium',
    'dextromoramide',
    'secobarbital',
    'seconal',
    'a-pvp',
    'alpha-pvp',
    'apvp',
    'alpha-Pyrrolidinopentiophenone',
    'flocka',
    'flakka',
    'α-pvp',
    'αpvp',
    'brotizolam',
    'lendormin',
    'valerylfentanyl',
    'vf',
    'indapex',
    '5-meo-tmt',
    'mescaline',
    'buttons',
    'mesc',
    'san',
    'san-pedro',
    'bromazepam',
    'lectopam',
    'lexilium',
    'lexotan',
    'brazepam',
    'lexotanil',
    '4-mec',
    '4-Methylethcathinone',
    '4mec',
    '4-methylethcathinone',
    'vyvanse',
    'lisdextroamfetamine',
    'lisdextroamphetamine',
    'lisdexamphetamine',
    'lisdexamfetamine',
    'parafluorofentanyl',
    'pff',
    '4-fluorofentanyl',
    'methyprylon',
    'noludar',
    'furanylfentanyl',
    'fu-f',
    'furanyl-fentanyl',
    'ethylcathinone',
    'ethcathinone',
    'e-cat',
    'eth-cat',
    'o-desmethyltramadol',
    'odt',
    'o-smt',
    'o-dsmt',
    'opium',
    'O',
    'dipt',
    'diisopropyltryptamine',
    'adinazolam',
    'deracyn',
    '25t-2-nbome',
    '25t2-nbome',
    'mephedrone',
    '4-mmc',
    'meow',
    'm-cat',
    '4-methylmethcathinone',
    '4mmc',
    '4-fma',
    '4-fluromethamphetamine',
    '4fma',
    'cannabis',
    'weed',
    'thc',
    'marijuana',
    'dagga',
    'hash',
    'sonata',
    'zaleplon',
    '4f-pvp',
    '4f-a-pvp',
    'pfpvp',
    'metizolam',
    'metiz',
    'desmethyletizolam',
    'aleph',
    'dot',
    'para-dot',
    '1b-lsd',
    '1b',
    '2c-b-fly-nbome',
    '2cbflynbome',
    'carphedon',
    'phenylpiracetam',
    'phenotropil',
    'mxm',
    'methoxmetamine',
    'al-lad',
    'allad',
    'pst',
    'poppy-seed-tea',
    'poppy-tea',
    'armodafinil',
    'nuvigil',
    '2-pa',
    '2-phenylacetamide',
    'ah-7921',
    'ah7921',
    '2c-t-7',
    '2ct7',
    'bupropion',
    'wellbutrin',
    'zyban',
    'amfebutamone',
    'zopiclone',
    'imovane',
    'zimovane',
    'prolintane',
    'catovit',
    'promotil',
    'villescon',
    '2-chloro-ephenidine',
    '2-chloroephenidine',
    '2chloroephenidine',
    '2-cl-ephenidine',
    '2clephenidine',
    'diclofensine',
    'ro8-4650',
    'hdmp-28',
    'methylnaphtidate',
    '3,4-ctmp',
    '34ctmp',
    '3,4-dichloromethylphenidate',
    'hydromorphone',
    'dilaudid',
    'diluadid',
    'hydroxyzine',
    'vistaril',
    'atarax',
    '2-fea',
    '2-fluoroethylamphetamine',
    'clonazolam',
    'c-lam',
    'clam',
    'ethaqualone',
    'etaqualone',
    'cyclopropylmescaline',
    'cpm',
    '4-cyclopropylmethoxy-3',
    'dmt',
    'n,n-dmt',
    'dimethyltryptamine',
    'propylphenidate',
    'pph',
    '25n-nbome',
    '2-c-n-nbome',
    '25n',
    'oxymorphone',
    'opana',
    'stopsigns',
    'mushrooms',
    'psilocybin',
    'shrooms',
    'mushroom',
    'psylocybin',
    '6-apb',
    '6apb',
    'ethketamine',
    'n-ethyl-norketamine',
    'nek',
    'n-ethylnorketamine',
    'l-theanine',
    'theanine',
    '25b-nbome',
    '25b',
    '4-aco-mipt',
    'mipracetin',
    '4acomipt',
    'neb',
    'n-ethylbuphedrone',
    'sulbutiamine',
    'sulbut',
    'arcalion',
    'enerion',
    'bisibuthiamine',
    'youvitan',
    '4-ho-met',
    '4homet',
    'homet',
    'metocin',
    'ethocin',
    '25e-nbome',
    '25e',
    '4-benzylpiperidine',
    '4-pmpd',
    '2-ai',
    '2ai',
    '2-aminoindan',
    '4-ho-dipt',
    'iprocin',
    'd2pm',
    'diphenylprolinol',
    'tilidine',
    'tilidate',
    'tilidin',
    'valoron',
    'valtran',
    '2c-b-fly',
    '2cb-fly',
    '2cbfly',
    'cyclopentyl-fentanyl',
    'cp-f',
    'cpf',
    'flunitrazolam',
    'fln',
    'dextropropoxyphene',
    'darvocet',
    'co-proxamol',
    'coproxamol',
    'capadex',
    'di-gesic',
    'placdyl',
    'placidyl',
    'ethchlorvnol',
    'nordazepam',
    'nordaz',
    'nordiazepam',
    'desmethyldiazepam',
    'crl-40-941',
    'fladrafinil',
    'fluoromodafinil',
    'modafinil',
    'provigil',
    'u-47700',
    'u47700',
    '3-fpm',
    '3fpm',
    '3-fph',
    '3f-phenmetrazine',
    '3f-p',
    '3fp',
    'pal-593',
    'mt-45',
    'ic-6',
    'mt45',
    'camazepam',
    'albego',
    'limpidon',
    'paxor',
    'nitrous',
    'laughing_gas',
    'n20',
    'n2o',
    'nos',
    'acetylfentanyl',
    'acetyl-fentanyl',
    'a-f',
    'prazepam',
    'centrac',
    'centrax',
    'demetrin',
    'lysanxia',
    'pozapam',
    'prasepine',
    'prazene',
    'reapam',
    'trepidan',
    'caffeine',
    'coffee',
    'crl-40-940',
    'flmodafinil',
    'lauflumide',
    'bisfluoromodafinil',
    'tuinal',
    'tuinol',
    'chirstmas-trees',
    'rainbows',
    'beans',
    'nawls',
    'jeebs',
    'diethyl-ether',
    'ether',
    'methamnetamine',
    'methylnaphetamine',
    'mnt',
    'n-methyl-pal-287',
    '25c-nbome',
    '25c',
    '2c-nbome',
    'ald-52',
    'ald52',
    '1alsd',
    '1a-lsd',
    'pentylone',
    '4-meppp',
    'bk-mbdp',
    'bk-methyl-k',
    '1p-lsd',
    '1plsd',
    '1p',
    '4-fluoroethylphenidate',
    '4f-eph',
    '4-feph',
    '4-ho-det',
    '4hodet',
    '4-hydroxy-det',
    '2-fma',
    '2fma',
    'pfbt',
    '4-fluorotropacocaine',
    'isopropylphenidate',
    'iph',
    'ipph',
    'ippd',
    'ipp',
    'flubromazolam',
    'f-lam',
    'flam',
    'apap',
    'acetaminophen',
    'paracetamol',
    'tylenol',
    'dexedrine',
    'dextroamphetamine',
    'dexamfetamine',
    'metaxalone',
    'skelaxin',
    '2c-t-4',
    '2ct4',
    '2c-t4',
    '2-ct4',
    '2ct-4',
    'ketamine',
    'k',
    'ket',
    'kitty',
    'kittens',
    'methoxphenidine',
    '2-meo-diphenidine',
    'methoxyphenidine',
    '2-mxp',
    'mxp',
    '4-aco-met',
    'metacetin',
    '4-acetoxy-met',
    '4acomet',
    'fentanyl',
    'fent',
    '3-oh-phenazepam',
    '3-ho-phenazepam',
    '3hophenazepam',
    '3ohphenazepam',
    '3-ho-p',
    '3hop',
    '3-oh-p',
    '3ohp',
    '3-hydroxyphenazepam',
    '3-mmc',
    '3mmc',
    '3-methylmethcathinone',
    '3methylmethcathinone',
    '3-meph',
    '3-mephedrone',
    '5-mapdb',
    '5mapdb',
    '1,4-butanediol',
    'bd',
    '1,4-bd',
    '14bd',
    '2c-i',
    '2ci',
    '3-meo-pce',
    '3meopce',
    'methoxyieticyclidine',
    'loprazolam',
    'dormonoct',
    '5-meo-dalt',
    '5meodalt',
    'deschloroketamine',
    '2-oxo-pcm',
    'dxe',
    'dck',
    'o-pcm',
    'opcm',
    '2-oxo-pcm',
    'mipt',
    'n-methyl-n-isopropyltryptamine',
    'nitrazepam',
    'mogadon',
    'baronite',
    'dormin',
    'dreem',
    'enzed',
    'gentravit',
    'hypnonex',
    'hypnoril',
    'hypnotex',
    'konit',
    'nicare',
    'nigap',
    'nipam',
    'nirosun',
    'nitavan',
    'nithra',
    'oxycodone',
    'oxy',
    'oxycontin',
    'percocet',
    'oxynorm',
    'ethyl-pentedrone',
    'nep',
    'n-ethylpentedrone',
    'lormetazepam',
    'noctamid',
    'methylphenidate',
    'mph',
    'ritalin',
    'concerta',
    'biphentin',
    '6-mddm',
    '6-methylenedihydrodesoxymorphine',
    '25g-nbome',
    '25g',
    '25gnbome',
    'norflurazepam',
    'n-desalkylflurazepam',
    'temazepam',
    'restoril',
    'det',
    'diethyltryptamine',
    'oxiracetam',
    'neuractiv',
    'neuromet',
    'hydroxypiracetam',
    'glutethimide',
    'doriden',
    'elrodorm',
    'noxyron',
    'glimid',
    'mdma',
    'molly',
    'ecstasy',
    'adam',
    'xtc',
    'mandy',
    'x',
    'md',
    'clonazepam',
    'klonopin',
    'kpin',
    '2c-b',
    'bees',
    'nexus',
    '2cb',
    '2cb',
    '2-cb',
    'am-2201',
    'am2201',
    '5-apb',
    '5apb',
    '2c-p',
    '2cp',
    'thiopropamine',
    'tpa',
    'normethiopropamine',
    'a-methyl-2-thipheneethanamine',
    'mxe',
    'methoxetamine',
    '3-meo-2oxo-pce',
    'dramamine',
    'dimenhydrinate',
    'gravol',
    'lsm-775',
    'lsm',
    'prl-8-53',
    'prl853',
    '5-eapb',
    '5eapb',
    '4-fa',
    '4-Fluoroamphetamine',
    '4fa',
    '4-fmp',
    '4-fluoroamphetamine',
    'aleph-2',
    'dot-2',
    'dot2',
    'aleph2',
    'mephtetramine',
    'mtta',
    'ibogaine',
    'iboga',
    'methallylescaline',
    'mal',
    'estazolam',
    'prosom',
    'eurodin',
    'elprazolam',
    '5-meo-eipt',
    '5meoeipt',
    'phenethylamine',
    'pea',
    'heroin',
    'diamorphine',
    'flurazepam',
    'dalmane',
    '5-it',
    '5-api',
    '25i-nbome',
    '25i',
    '2-c-i-nbome',
    '25-i',
    'clobazam',
    'frisium',
    'doet',
    'doe',
    'phenmetrazine',
    'preludin',
    'lorazepam',
    'ativan',
    '2-methylamphetamine',
    '2-ma',
    'ab-fubinaca',
    'ab-fub',
    'mexazolam',
    'melex',
    'sedoxil',
    '4-mta',
    '4-methylthioamphetamine',
    'amt',
    'Alpha-methyltryptamine',
    'alpha-methyltryptamine',
    'alphamethyltryptamine',
    'indopan',
    'monase',
    'dihydrocodeine',
    'dhc',
    'mpa',
    'methiopropamine',
    '4-fluoropentedrone',
    '4-fpd',
    '4-f-pentedrone',
    '4f-pentedrone',
    'cinolazepam',
    'geroderm',
    'triazolam',
    'halcion',
    'mdpa',
    'methylenedioxyphenylacetamide',
    'allylescaline',
    'al',
    'hexen',
    'ethyl-hexedrone',
    'n-ethylhexedrone',
    'hex-en',
    'n-ethyl-hexedrone',
    'buprenorphine',
    'suboxone',
    'subs',
    'bupe',
    'phenobarbital',
    'pheno',
    'phenobarbitone',
    'luminal',
    'bentazepam',
    'thiadipone',
    'tiadipona',
    'dph',
    'diphenhydramine',
    'benadryl',
    'marinol',
    'dronabinol',
    'syndros',
    'cesamet',
    'δ9-thc',
    'δ9--tetrahydrocannabinol',
    'delta9-tetrahydrocannabinol',
    'delta9-thc',
    '4-methylmethylphenidate',
    '4-mmph',
    '4-me-tmp',
    '4-metmp',
    '5-meo-dmt',
    '5meodmt',
    'toads',
    '5-meo',
    '5meo',
    '5-medmt',
    'dpt',
    'dipropyltryptamine',
    'focalin',
    'dexmethylphenidate',
    'dextromethylphenidate',
    '25b-nboh',
    '25bnboh',
    'nboh-2cb',
    '2cb-nboh',
    '2c-b-nboh',
    'dxm',
    'dextromethorphan',
    'robo',
    'syrup',
    'robotussin',
    'dex',
    'robitussin',
    'mephenmetrazine',
    '4-mpm',
    '4-methylphenmetrazine',
    '1p-eth-lad',
    '1pethlad',
    'methylone',
    'bk-mdma',
    'm1',
    'mdmc',
    '25t-4-nbome',
    '25t4-nbome',
    'atomoxetine',
    'strattera',
    '5-meo-mipt',
    '5meomipt',
    'moxy',
    '5meo-mipt',
    'ronlax',
    'ethyl-loflazepate',
    'meilax',
    'victan',
    'librium',
    'chlordiazepoxide',
    '4-aco-dipt',
    '4-acetoxy-dipt',
    '4acodipt',
    'ipracetin',
    'iprocetyl',
    'aces',
    'methoxyacetyl-fentanyl',
    'maf',
    'desfluoroocfentanil',
    'propylhexedrine',
    'benzedrex',
    'propylhexadrine',
    'hexahdromethamphetamine',
    'mdea',
    'mde',
    'eve',
    '4-aco-dpt',
    '4acodpt',
    'hdep-28',
    'ethylnaphthidate',
    'demerol',
    'pethidine',
    'meperidine',
    '4-fea',
    '4-fluoroethylamphetamine',
    'bk-2c-b',
    'bk-2cb',
    'bk-2-cb',
    'b-k-2cb',
    'b-k2cb',
    'b-k2-cb',
    'b-k2-c-b',
    'b-k-2-c-b',
    'bk2cb',
    'dehydroxyfluorafinil',
    'modafiendz',
    'noctec',
    'chloral-hydrate',
    'aquachloral',
    'somnos',
    'cocaine',
    'coke',
    'gabapentin',
    'neurontin',
    '2c-e',
    '2ce',
    'rti-111',
    'dichloropane',
    'aet',
    'alpha-ethyl-tryptamine',
    'a-et',
    'a-ethyltryptamine',
    '4-aco-dmt',
    '4acodmt',
    'psilacetin',
    '4-aco',
    '4-acetoxy-dmt',
    '4-ho-mpmi',
    'lucigenol',
    '3-meo-pcp',
    '3meopcp',
    '2c-d',
    '2cd',
    '2c-m',
    '2cm',
    '4,4-dmar',
    'serotoni',
    '4,4-dmap',
    'medazepam',
    'nobrium',
    'azepamid',
    'rudotel',
    'raporan',
    'mezapam',
    'talis',
    'carisoprodol',
    'soma',
    'mexedrone',
    '4-mmeoc',
    '5-meo-dpt',
    '5meodpt',
    'halazepam',
    'paxipam',
    'quazepam',
    'doral',
    '2-fdck',
    '2f-ketamine',
    '2f-ket',
    '2-fluorodeschloroketamine',
    '2-fl-2-oxo-pcm',
    '2f-dck',
    '2fket',
    '2fdck',
    'centrophenoxine',
    'lucidril',
    'meclofenoxate',
    '3-fma',
    '3fma',
    'dimemebfe',
    '5-meo-bfe',
    'alpha-php',
    'pv-7',
    'a-php',
    'aphp',
    'α-php',
    'αphp',
    'o-pce',
    '2-oxo-pce',
    'eticyclidone',
    'opce',
    '2-oxo-pce',
    '25d-nbome',
    '2c-d-nbome',
    '25d',
    '2c-n',
    '2cn',
    'isoproscaline',
    'ip',
    'eth-lad',
    'ethlad',
    'lsa',
    'hbwr',
    'morningglory',
    'hbmg',
    'Morning',
    'ololiuqui',
    'morning_glory',
    'hbw',
    'flunitrazepam',
    'roofies',
    'rohypnol',
    'methylmethaqualone',
    'mmq',
    '4-meo-pcp',
    '4meopcp',
    '4-ho-mpt',
    '4hompt',
    'dipipanone',
    'diconal',
    'parafluorobutyrfentanyl',
    'pfbf',
    '4-fluorobutyrfentanyl',
    '4-fbf',
    '25i-nboh',
    'nboh-2ci',
    'cimbi-27',
    '5-meo-amt',
    '5meoamt',
    'nefiracetam',
    'nerfiracetam',
    'propranolol',
    'inderal',
    'hemangeol',
    'innopran',
    '3c-p',
    '3cp',
    '5-meo-nipt',
    '5meonipt',
    'quetiapine',
    'seroquel',
    'mdphp',
    'monkey-dust',
    'dalt',
    'n-diallyltryptamine',
    'diallyltryptamine',
    'mdpv',
    'bath_salts',
    'pinazepam',
    'domar',
    'amphetamine',
    'speed',
    'pepp',
    'amphetamines',
    'amphetamin',
    'amfetamine',
    'amph',
    'hearts',
    '6-apdb',
    '4-desoxy-mda',
    'pce',
    'eticyclidine',
    '4-cmc',
    '4cmc',
    '5-meo-dipt',
    'foxy',
    'foxy-methoxy',
    '5meodipt',
    'clotiazepam',
    'clozan',
    'distensan',
    'trecalmo',
    'rize',
    'rizen',
    'veratran',
    'u-51754',
    'methene-u47700',
    'methene-u-47700',
    '1,3-dmaa',
    '1,3-dimethylbutylamine',
    '1,4-butanediol',
    '1b-lsd',
    '1p-eth-lad',
    '1p-lsd',
    '1v-lsd',
    '1cp-al-lad',
    '1cp-lsd',
    '1cp-mipla',
    '2,5-dma',
    '2-aminoindane',
    '2-fa',
    '2-fea',
    '2-fma',
    '2-fluorodeschloroketamine',
    '2-mmc',
    '25b-nboh',
    '25b-nbome',
    '25c-nboh',
    '25c-nbome',
    '25d-nbome',
    '25e-nboh',
    '25h-nbome',
    '25i-nboh',
    '25i-nbome',
    '25n-nbome',
    '25x-nboh',
    '25x-nbome',
    '2c-b',
    '2c-b-fly',
    '2c-c',
    '2c-d',
    '2c-e',
    '2c-h',
    '2c-i',
    '2c-p',
    '2c-t',
    '2c-t-2',
    '2c-t-21',
    '2c-t-7',
    '2c-t-x',
    '2c-x',
    '2m2b',
    '3,4-ctmp',
    '3-cl-pcp',
    '3-fa',
    '3-fea',
    '3-fma',
    '3-fpm',
    '3-ho-pce',
    '3-ho-pcp',
    '3-mmc',
    '3-me-pcp',
    '3-me-pcpy',
    '3-meo-pce',
    '3-meo-pcmo',
    '3-meo-pcp',
    '3c-e',
    '3c-p',
    '4-aco-det',
    '4-aco-dmt',
    '4-aco-dipt',
    '4-aco-met',
    '4-aco-mipt',
    '4-fa',
    '4-fma',
    '4-ho-det',
    '4-ho-dpt',
    '4-ho-dipt',
    '4-ho-ept',
    '4-ho-met',
    '4-ho-mpt',
    '4-ho-mipt',
    '4-mec',
    '4-meo-pcp',
    '4c-d',
    '4f-adb',
    '4f-eph',
    '4f-mph',
    '5-apb',
    '5-hydroxytryptophan',
    '5-mapb',
    '5-meo-dalt',
    '5-meo-dmt',
    '5-meo-dibf',
    '5-meo-dipt',
    '5-meo-eipt',
    '5-meo-mipt',
    '5-meo-amt',
    '5f-akb48',
    '5f-pb-22',
    '6-apb',
    '6-apdb',
    '8-chlorotheophylline',
    'a-php',
    'a-pvp',
    'ab-fubinaca',
    'al-lad',
    'ald-52',
    'apica',
    'acetylfentanyl',
    'adrafinil',
    'alcohol',
    'alimemazine',
    'allylescaline',
    'alpha-gpc',
    'alprazolam',
    'amanita muscaria',
    'amantadine',
    'amobarbital',
    'amphetamine',
    'amphetamine (disambiguation)',
    'anadenanthera peregrina',
    'aniracetam',
    'antidepressants',
    'antihistamine',
    'antipsychotic',
    'armodafinil',
    'arylcyclohexylamines',
    'atropa belladonna',
    'ayahuasca',
    'baclofen',
    'banisteriopsis caapi',
    'barbiturates',
    'benzodiazepines',
    'benzydamine',
    'bromantane',
    'bromazolam',
    'bromo-dragonfly',
    'bufotenin',
    'buprenorphine',
    'butylone',
    'cabergoline',
    'caffeine',
    'cake',
    'cannabidiol',
    'cannabinoid',
    'cannabis',
    'carisoprodol',
    'changa',
    'choline bitartrate',
    'cinolazepam',
    'citicoline',
    'classical psychedelics',
    'clonazepam',
    'clonazolam',
    'clonidine',
    'cocaine',
    'cocoa',
    'codeine',
    'coluracetam',
    'creatine',
    'cyclazodone',
    'cyclobenzaprine',
    'det',
    'dmt',
    'dob',
    'doc',
    'doi',
    'dom',
    'dox',
    'dpt',
    'datura',
    'datura (botany)',
    'deliriant',
    'depressant',
    'deschloroetizolam',
    'deschloroketamine',
    'desomorphine',
    'desoxypipradrol',
    'dexamphetamine',
    'dextromethorphan',
    'dextropropoxyphene',
    'dipt',
    'diarylethylamines',
    'diazepam',
    'dichloropane',
    'diclazepam',
    'dihydrocodeine',
    'diphenhydramine',
    'diphenidine',
    'dissociatives',
    'doxylamine',
    'ept',
    'eth-cat',
    'eth-lad',
    'efavirenz',
    'entactogens',
    'entheogen',
    'ephedrine',
    'ephenidine',
    'ephylone',
    'ergotamine',
    'escaline',
    'etazene',
    'ethylmorphine',
    'ethylone',
    'ethylphenidate',
    'etizolam',
    'eugeroics',
    'eutylone',
    'f-phenibut',
    'fasoracetam',
    'fentanyl',
    'flualprazolam',
    'flubromazepam',
    'flubromazolam',
    'fluclotizolam',
    'flunitrazepam',
    'flunitrazolam',
    'gbl',
    'ghb',
    'gabapentin',
    'gabapentinoids',
    'gaboxadol',
    'galantamine',
    'hxe',
    'hallucinogens',
    'haloperidol',
    'harmala alkaloid',
    'heroin',
    'hexedrone',
    'hydrocodone',
    'hydromorphone',
    'hyoscyamus niger (botany)',
    'hypnotic',
    'ibogaine',
    'inhalants',
    'iso-lsd',
    'isopropylphenidate',
    'jwh-018',
    'jwh-073',
    'kava',
    'ketamine',
    'kratom',
    'lae-32',
    'lsa',
    'lsd',
    'lsm-775',
    'lsz',
    'lisdexamfetamine',
    'list of prodrugs',
    'lorazepam',
    'lysergamides',
    'maoi',
    'mcpp',
    'mda',
    'mdai',
    'mdea',
    'mdma',
    'mdpv',
    'met',
    'mmda',
    'mpt',
    'mxpr',
    'mxipr',
    'mandragora',
    'mandragora officinarum (botany)',
    'mebroqualone',
    'melatonin',
    'memantine',
    'mephedrone',
    'meprobamate',
    'mescaline',
    'methadone',
    'methallylescaline',
    'methamphetamine',
    'methaqualone',
    'methcathinone',
    'methiopropamine',
    'methoxetamine',
    'methoxphenidine',
    'methylnaphthidate',
    'methylone',
    'methylphenidate',
    'metizolam',
    'mexedrone',
    'mipla',
    'mipt',
    'midazolam',
    'mirtazapine',
    'modafinil',
    'morning glory',
    'morphine',
    'myristicin',
    'n-acetylcysteine',
    'n-ethylhexedrone',
    'n-methylbisfluoromodafinil',
    'nep',
    'nm-2-ai',
    'naloxone',
    'nicotine',
    'nifoxipam',
    'nitrous',
    'nootropic',
    'o-desmethyltramadol',
    'o-pce',
    'omberacetam',
    'opioids',
    'oroxylin a',
    'orphenadrine',
    'oxiracetam',
    'oxycodone',
    'oxymorphone',
    'pargy-lad',
    'pce',
    'pcp',
    'pma',
    'pmma',
    'ppap',
    'pro-lad',
    'peganum harmala',
    'pentedrone',
    'pentobarbital',
    'pentylone',
    'pethidine',
    'phenazepam',
    'phenethylamine (compound)',
    'phenibut',
    'phenmetrazine',
    'phenobarbital',
    'phenylpiracetam',
    'picamilon',
    'piper nigrum (botany)',
    'piracetam',
    'poppers',
    'pramiracetam',
    'pregabalin',
    'prochlorperazine',
    'prolintane',
    'promethazine',
    'propylhexedrine',
    'proscaline',
    'pseudoephedrine',
    'psilocin',
    'psilocybe cubensis',
    'psilocybin mushrooms',
    'psychedelics',
    'pyrazolam',
    'quetiapine',
    'rima',
    'racetams',
    'risperidone',
    'sam-e',
    'sts-135',
    'salvia divinorum',
    'salvinorin a',
    'salvinorin b methoxymethyl ether',
    'secobarbital',
    'sedative',
    'selective serotonin reuptake inhibitor',
    'serotonergic psychedelic',
    'serotonin',
    'serotonin-norepinephrine reuptake inhibitor',
    'sertraline',
    'stimulants',
    'substituted aminorexes',
    'substituted amphetamines',
    'substituted cathinones',
    'substituted morphinans',
    'substituted phenethylamines',
    'substituted phenidates',
    'substituted tryptamines',
    'sufentanil',
    'synthetic cannabinoid',
    'thc-o',
    'thj-018',
    'thj-2201',
    'tma',
    'tma-2',
    'tma-6',
    'tabernanthe iboga (botany)',
    'tapentadol',
    'temazepam',
    'n-methyl-cyclazodone',
    'theacrine',
    'theanine',
    'thebaine',
    'thienodiazepines',
    'thujone',
    'tianeptine',
    'tramadol',
    'triazolam',
    'troparil',
    'tryptamine (compound)',
    'tyrosine',
    'u-47700',
    'xanthines',
    'zaleplon',
    'zolpidem',
    'zopiclone',
    'beta-carboline',
    'α-pihp',
    'αmt',
    'βk-2c-b',
    'cbd',
];

const WIKI_REF: any = {
    bufotenin: 'bufotenin',
    bufotenine: 'bufotenine',
    nmt: 'N-Methyltryptamine',
    yuremamine: 'yuremamine',
    'a-phip': 'a-PHiP',
    '5-cl-dmt': '5-Chloro-DMT',
    microcrystalline: 'Microcrystalline',
    cellulose: 'cellulose',
    '5-br-dmt': '5-Bromo-DMT',
    'boh-2c-b': 'Βk-2C-B',
    dmxe: 'Deoxymethoxetamine',
    '5-mmpa': '5-Methylmethiopropamine',
    methoxpropamine: 'Methoxpropamine',
    fxe: 'Fluorexetamine',
    '3-cmc': '3-Chloromethcathinone',
    '5-meo-nmt': '5-MeO-NMT',
    'n-methyltryptamine': 'N-Methyltryptamine',
};

interface DataType {
    title: string;
    key: string;
    purity: any;
    substanceClass: any;
    substance: any;
    appearance: any;
    vendor: any;
    dateOfPurchase: string;
    substancesIdentified: any;
    analysisResultsSpectra: any;
    comments: any;
    highlightWarningRow: any;
    sampleNr: any;
}

const humanizePurity = (purity: boolean): string => {
    return purity ? 'not found to be adulterated' : 'Adulterated/impure';
};

const OTHER_SUBSTANCES_GOOGLE_SHEETS_OPTIONS = {
    apiKey:
        process.env.REACT_APP_GOOGLE_API_KEY ||
        'AIzaSyDOqJ3kTm4BXvmHJAN0_n390fCcayum6Iw',
    sheetId:
        process.env.REACT_APP_GOOGLE_SHEETS_ID ||
        '1LmWrNzCc3PETEHYl3Khc9pr_7DfoG1M4XHJEf_mhzT4',
    sheetsOptions: [{ id: 'PUBLIC_DATA' }],
};

const render_results = (results: string) => {
    return results
        .split('\n')
        .map((row: string) =>
            row
                .split(' ')
                .map((
                    word: string,
                    index: number,
                ) => {
                    if (
                        AVAILABLE_PSYCHONAUTWIKI_SUBSTANCES.includes(word.toLowerCase())
                    ) {
                        return `<a href='https://psy.is/${word}' target='_blank'>${word}</a>`;
                    }
                    if (Object.keys(WIKI_REF)
                        .includes(word.toLowerCase())) {
                        return `<a href='https://en.wikipedia.org/wiki/${
                            WIKI_REF[word.toLowerCase()]
                        }' target='_blank'>${word}</a>`;
                    }

                    return word;
                })
                .join(' '),
        )
        .join('\n');
};

const filterByKey = (
    tableData: any,
    ethnobotanical_data: any,
    key: string,
) => {
    const ethno_map = new Map(
        ethnobotanical_data.map((obj: any) => [
            obj['GENERAL SAMPLE INFO Sample Nr'],
            obj['PLANT INFO Species (A101+A102)'],
        ]),
    );

    if (key === 'ethnobotanical') {
        return tableData
            .filter((row: any) => ethno_map.has(row['Sample Nr ']))
            .map((row: any) => ({ ...row, title: ethno_map.get(row['Sample Nr ']) }));
    } else {
        return tableData.filter((row: any) => !ethno_map.has(row['Sample Nr ']));
    }
};

const InchiKey = ({ CID }: { CID: string }) => {
    const pubchemData = useFetch<any>(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${CID}/json`,
    );
    const inchikey =
        pubchemData?.data?.Record?.Section?.[2]?.Section?.[1]?.Section?.[2]
            ?.Information?.[0]?.Value?.StringWithMarkup?.[0]?.String;
    if (!inchikey) {
        return null;
    }

    return (
        <>
            <div>InChIKey: {inchikey}</div>
            <hr/>
        </>
    );
};

const ChemStruc = ({ substance }: { substance: string }) => {
    const { data } = useFetch<any>(`${PUBCHEM_CID_URL}${substance}`);
    const CID = data?.ConceptsAndCIDs?.CID?.[0];

    if (!data || !CID) {
        return null;
    }

    return (
        <div>
            <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${CID}`}
                target="_blank"
                rel="noreferrer"
            >
                PubChem Link
            </a>
            <hr/>
            <InchiKey CID={CID}/>
            <div>2D Structure:</div>
            <img
                width={160}
                height={160}
                src={`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${CID}&t=l`}
                alt={substance}
            />
        </div>
    );
};

const Results: NextPage<any> = ({
    substances_cached,
}: {
    substances_cached: any;
}) => {
    const { data: data1, loading: loading1 } = useGoogleSheets(
        OTHER_SUBSTANCES_GOOGLE_SHEETS_OPTIONS,
    );

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [filteredInfo, setFilteredInfo] = useState<
        Record<string, FilterValue | null>
    >({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const locales: any = {
        'en-US': en_locale,
        'es-ES': es_locale,
    };

    const { locale } = useRouter();
    const t = locales[locale || 'en-US'];

    const handleChange: TableProps<DataType>['onChange'] = (
        pagination,
        filters,
        sorter,
    ) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const [used_data, set_used_data] = useState<any>(substances_cached);

    useEffect(() => {
        if (!loading1) {
            set_used_data(data1?.[0]?.data);
        }
    }, [loading1]);


    const tableData = used_data
        ?.filter((item: any) => item?.['Publish '] === 'TRUE')
        ?.filter(
            (item: any) =>
                item?.['type '] !== 'Plant'
                && item?.['type '] !== 'Extract'
        )
        ?.filter(
            (item: DataType) =>
                Object.values(item)
                    .some((value: any) =>
                        String(value)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                    ),
        )
        ?.sort(
            (
                item_a: any,
                item_b: any,
            ) => item_b['Sample Nr '] - item_a['Sample Nr '],
        )
        ?.map(
            (item: any): DataType => ({
                ...item,
                sampleNr: <div>{item['Sample Nr ']}</div>,
                dateOfPurchase: item['Date of Purchase '],
                substanceClass: item['Sample class '],
                substancesIdentified: (
                    <div className="flex items-center">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: render_results(item['Final result ']),
                            }}
                        />
                    </div>
                ),
                purity: item['Adulterated/impure? '] !== 'Yes',
                substance: item['Expected result '],
                title: item['Expected result '],
                // vendor: item["Vendor name"],
                vendor: (
                    <a href={item[' link']} target="_blank" rel="noreferrer">
                        {item['Vendor name']}
                    </a>
                ),
                comments: item['Comments '],
                // substance: documentToReactComponents(item.substance, renderOptions),
                appearance: get_image_link(item, true) ? (
                    <Popover
                        trigger="hover"
                        title={item['Appearance ']}
                        content={
                            <img
                                width={300}
                                height={200}
                                src={get_image_link(item, false) ?? ''}
                                alt={item['Appearance ']}
                            />
                        }
                    >
                        <a>
                            <div>
                                {get_image_link(item, true) && (
                                    <div className="text-center">
                                        <img
                                            width={150}
                                            height={70}
                                            src={get_image_link(item, true)}
                                            alt={item['Appearance ']}
                                        />
                                    </div>
                                )}
                            </div>
                        </a>
                    </Popover>
                ) : (
                    <div>{item['Appearance ']}</div>
                ),
                // vendor: documentToReactComponents(item.vendor, renderOptions),
                analysisResultsSpectra: (
                    <div>
                        {item['Analysis Results Spectra Infrared Spectrum (FT-IR)'] && (
                            <a
                                href={
                                    item['Analysis Results Spectra Infrared Spectrum (FT-IR)']
                                }
                                target="_blank"
                                rel="noreferrer"
                            >
                                Infrared Spectrum FT-IR
                            </a>
                        )}
                        {item[' HPLC-MS/MS'] && (
                            <div>
                                <a href={item[' HPLC-MS/MS']} target="_blank" rel="noreferrer">
                                    HPLC-MS/MS
                                </a>
                                <br/>
                            </div>
                        )}
                        {item[' NMR'] && (
                            <div>
                                <a href={item[' NMR']} target="_blank" rel="noreferrer">
                                    NMR
                                </a>
                                <br/>
                            </div>
                        )}
                        {item[' TLC and reagent'] && (
                            <div>
                                <a
                                    href={item[' TLC and reagent']}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    TLC and reagent
                                </a>
                                <br/>
                            </div>
                        )}
                    </div>
                ),
            }),
        );

    const columns: ColumnsType<DataType> = [
        {
            title: 'Nr.',
            dataIndex: 'sampleNr',
            key: 'sampleNr',
            width: 58,
            sorter: (
                a: any,
                b: any,
            ) => (a.sampleNr > b.sampleNr ? 1 : -1),
            sortOrder: sortedInfo.columnKey === 'sampleNr' ? sortedInfo.order : null,
        },
        {
            title: 'Purity',
            dataIndex: 'purity',
            key: 'purity',
            sorter: (
                a: any,
                b: any,
            ) => (a.purity > b.purity ? 1 : -1),
            sortOrder: sortedInfo.columnKey === 'purity' ? sortedInfo.order : null,
            width: 75,
            responsive: ['md'],
            render: (purity: boolean) => (
                <Tooltip title={humanizePurity(purity)}>
                    <div
                        className={purity ? 'bg-blue-500' : 'bg-red-500'}
                        style={{ width: '30px', height: '30px' }}
                    />
                </Tooltip>
            ),
        },
        {
            title: 'Sample (expected)',
            dataIndex: 'substance',
            key: 'substance',
            sorter: (
                a: any,
                b: any,
            ) => a.substance.localeCompare(b.substance),
            sortOrder: sortedInfo.columnKey === 'substance' ? sortedInfo.order : null,
            render: (
                substance: string,
                item: any,
            ) => (
                <Popover
                    content={
                        <div>
                            {substance.split(',')
                                .map((sub) => (
                                    <ChemStruc key={sub} substance={sub}/>
                                ))}
                        </div>
                    }
                    title={substance}
                >
                    {item.title}
                </Popover>
            ),
        },
        {
            title: 'Results',
            dataIndex: 'substancesIdentified',
            key: 'substancesIdentified',
            // width: 300,
        },
        {
            title: 'Sample class',
            dataIndex: 'substanceClass',
            key: 'substanceClass',
            sorter: (
                a: any,
                b: any,
            ) =>
                a.substanceClass.localeCompare(b.substanceClass),
            sortOrder:
                sortedInfo.columnKey === 'substanceClass' ? sortedInfo.order : null,
            filters: [
                { text: 'Phenethylamine', value: 'Phenethylamine' },
                { text: 'Tryptamine', value: 'Tryptamine' },
                { text: 'Lysergides', value: 'Lysergides' },
                { text: 'Cannabinoids', value: 'Cannabinoids' },
                { text: 'Cathinone', value: 'Cathinone' },
                { text: 'Arylcyclohexylamines', value: 'Arylcyclohexylamines' },
                { text: 'Ayahuasca', value: 'Ayahuasca' },
                { text: 'Beta-Carbolines', value: 'Beta-Carbolines' },
                { text: 'Iboga-Alkaloids', value: 'Iboga-Alkaloids' },
                { text: 'Ethnobotanical', value: 'Ethnobotanical' },
                { text: 'Amphetamine', value: 'Amphetamine' },
            ],
            filteredValue: filteredInfo.substanceClass || null,
            onFilter: (
                value: string | number | boolean,
                record: DataType,
            ): boolean =>
                record.substanceClass
                    .toLowerCase()
                    .includes(String(value)
                        .toLowerCase()),
            responsive: ['lg'],
            render: (sampleClass) => (
                <a
                    href={`https://psy.is/${sampleClass}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`sampleClass-${sampleClass}`}
                >
                    {sampleClass}
                </a>
            ),
        },
        {
            title: 'Appearance',
            dataIndex: 'appearance',
            key: 'appearance',
            responsive: ['lg'],
        },
        {
            title: 'Source',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'Date of purchase',
            dataIndex: 'dateOfPurchase',
            key: 'dateOfPurchase',
            sorter: (
                a: DataType,
                b: DataType,
            ) =>
                new Date(a.dateOfPurchase).getTime() -
                new Date(b.dateOfPurchase).getTime(),
            sortOrder:
                sortedInfo.columnKey === 'dateOfPurchase' ? sortedInfo.order : null,
            responsive: ['lg'],
        },
        {
            title: 'Analysis Results Spectra',
            dataIndex: 'analysisResultsSpectra',
            key: 'analysisResultsSpectra',
            // width: 250,
            responsive: ['lg'],
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
            responsive: ['lg'],
        },
    ];

    const [loading, setLoading] = useState<boolean>(false);

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

            <Header sticky={false}/>
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end w-full my-8">
                    <Link href="/results/ethnobotanicals">
                        <div className="lg:w-1/3 lg:pr-32">
                            <div
                                className="text-center special-classic-btn  p-4 bg-accent-8 text-white font-bold transition-all duration-75 ease-in cursor-pointer text-xl shadow-xl rounded-lg whitespace-nowrap flex items-center"
                                onClick={() => setLoading(true)}
                            >
                                <Image
                                    className=""
                                    src="/plants.png"
                                    alt="Plants"
                                    width={48}
                                    height={48}
                                />
                                <div className="h-full">
                                    &nbsp;{t['results_disclaimer_ethnobotanicals']} &nbsp; →
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="lg:w-1/3">
                        <div className="font-bold text-xl lg:text-5xl text-white text-center">
                            <Image
                                className="rounded-lg"
                                src="/chemicals.png"
                                alt="Plants"
                                width={300}
                                height={300}
                            />
                            <br/>
                            Classic drugs/RCs/NPS Results
                        </div>
                    </div>
                    <div className="lg:w-1/3 lg:pl-32">
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined/>}
                            allowClear
                            onChange={onChangeSearchTerm}
                            value={searchTerm}
                        />
                    </div>
                </div>

                <Table
                    dataSource={tableData}
                    columns={columns}
                    onChange={handleChange}
                    pagination={false}
                    rowClassName={(
                        record: DataType,
                        index: number,
                        indent: number,
                    ) =>
                        record.purity ? '' : 'bg-red-800'
                    }
                    sticky={true}
                    className="classic"
                />
            </div>

            <Footer/>
        </>
    );
};

export async function getStaticProps() {
    const substances_data = await GoogleSheetsMapper.fetchGoogleSheetsData(
        OTHER_SUBSTANCES_GOOGLE_SHEETS_OPTIONS,
    );

    return {
        props: {
            substances_cached: substances_data?.[0]?.data ?? null,
        },
    };
}
export default Results;

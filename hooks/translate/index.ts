import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

const useDynamicTranslate = () => {

    const { locale } = useRouter().query;

    const endpoint = 'https://api.cognitive.microsofttranslator.com/translate';

    const [translation, setTranslation] = useState(null);

    // useEffect(() => {

    // }, []);

    const translate: string = useCallback(async (text: string) => {
        const locales = ['en', 'ta', 'te'];
        const translation = await axios.post(endpoint, { text }, { params: {
            'api-version': '3.0',
            to: locales.join(','),
            from: 'en',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.MICROSOFT_TRANSLATE_KEY
            }
        }}).then(({data}) => locale + String(data)).catch(err => console.error(err));

        return translation; 
    }, [locale]);

    return { dt: translate }

};

export default useDynamicTranslate;
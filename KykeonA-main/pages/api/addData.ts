import type {
    NextApiRequest,
    NextApiResponse,
} from 'next';
import mongoose from 'mongoose';
import axios from 'axios';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect(process.env.DATABASE_URI as string);
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    await connectDB();
    const Schema = new mongoose.Schema({
        name: String,
        substance: String,
        description: String,
    });
    const Model = mongoose.models.Model || mongoose.model('Model', Schema);
    if (req.method === 'POST') {
        const { name, substance, description, recaptchaValue } = req.body;
        const captchaResponse = await axios.post(
            'https://hcaptcha.com/siteverify',
            `secret=${process.env.HC_SECRET_KEY}&response=${encodeURIComponent(
                recaptchaValue,
            )}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        if (!captchaResponse.data.success) {
            return res.status(400)
                .json({ error: 'hCaptcha verification failed' });
        }
        const data = new Model({ name, substance, description });
        const savedData = await data.save();
        res.status(200)
            .json({ message: 'Data successfully added', savedData });
    } else {
        res.status(404)
            .json({ error: 'This endpoint requires a POST request' });
    }
};

export default handler;

'use client'

import {useState} from 'react'
import AWS from 'aws-sdk';

export default function Page() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!file) {
            alert('Please select a gate 1 file to upload.')
            return
        }

        setUploading(true)

        AWS.config.update({
            accessKeyId: 'AKIA47CRZ4IKVTNODI7Y',
            secretAccessKey: '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',
            region: 'eu-north-1'
        });

        const s3 = new AWS.S3();

        // Generate a unique filename for the uploaded file
        const fileName = `${Date.now()}_${file.name}`;

        // Set the parameters for the S3 upload
        const params = {
            Bucket: 'gate1recordings',
            Key: fileName,
            Body: file,
            ContentType: file.type
        };

        try {
            // Upload the file to S3
            const data = await s3.upload(params).promise();
            console.log('Upload successful:', data);
            alert('Upload successful!');
        } catch (error) {
            console.error('S3 Upload Error:', error);
            alert('Upload failed.');
        }

        setUploading(false)
    }

    return (
        <main>
            <h1>Upload a File to S3</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="file"
                    type="file"
                    onChange={(e) => {
                        const files = e.target.files
                        if (files) {
                            setFile(files[0])
                        }
                    }}
                    accept="image/png, image/jpeg, video/mp4"
                />
                <button type="submit" disabled={uploading}>
                    Upload
                </button>
            </form>
        </main>
    )
}


export const Privacy = () => {
    return (
        <main className="flex min-h-screen flex-col items-start gap-12 py-48 px-24">
            <div className="flex flex-col justify-center gap-8 max-w-[75ch]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold">{`Privacy Policy`}</h1>
                    <p className="text-lg">{`Last updated: `}<b>{`June 30th, 2024`}</b></p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Introduction`}</h2>
                    <p className="text-lg">{`Welcome to Dustin + Bella (“we”, “our”, “us”). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at dustinandbella.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this privacy policy carefully; if you do not agree with the terms of this privacy policy, please do not access the site.`}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Information We Collect`}</h2>
                    <p className="text-lg">{`We may collect information about you in a variety of ways. The information we may collect on the Site includes:`}</p>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold">{`Personal Data`}</h3>
                        <p className="text-lg">{`Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as making song recommendations or indicating dietary restrictions. If you choose to share data about yourself via your profile or other interactive areas of the Site, please be advised that all data you disclose in these areas will be accessible to administrative users of the Site.`}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Use of Your Information`}</h2>
                    <p className="text-lg">{`Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:`}</p>
                    <ul className="list-disc list-inside">
                        <li className="text-lg">{`Create and manage your account.`}</li>
                        <li className="text-lg">{`Email you regarding your account.`}</li>
                        <li className="text-lg">{`Fulfill and manage song recommendations, attendance status, and dietary restrictions related to the Site.`}</li>
                        <li className="text-lg">{`Increase the efficiency and operation of the Site.`}</li>
                    </ul>
                    <h3 className="text-xl font-bold">{`Google Account Email Address`}</h3>
                    <p className="text-lg">{`We use your Google account's email address for authentication purposes. This allows you to log in to our Site securely and conveniently using your Google credentials. We do not share this email address with third parties, except as necessary to fulfill the purposes outlined in this privacy policy or as required by law.`}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Disclosure of Your Information`}</h2>
                    <p className="text-lg">{`We may share information we have collected about you in certain situations. Your information may be disclosed as follows:`}</p>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold">{`By Law or to Protect Rights`}</h3>
                        <p className="text-lg">{`If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.`}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Security of Your Information`}</h2>
                    <p className="text-lg">{`We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.`}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Policy for Children`}</h2>
                    <p className="text-lg">{`We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us at `}<a href="https://dustinandbella.com/contact" target="_blank">{`https://dustinandbella.com/contact`}</a></p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{`Changes to This Privacy Policy`}</h2>
                    <p className="text-lg">{`We may update this privacy policy from time to time. The updated version will be indicated by an updated "Effective Date" and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.`}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-lg">{`By using our services, you acknowledge that you have read and understand this Privacy Policy and agree to its terms.`}</p>
                </div>
            </div>
        </main>
    )
}

export default Privacy;
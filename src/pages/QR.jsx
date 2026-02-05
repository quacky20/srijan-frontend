import { useState } from "react";
import { useNavigate } from "react-router";
import "./Profilepage.css";
import PageHeader from "../components/PageHeader/PageHeader";
import { toast } from "react-toastify";
import QRCode from "qrcode";

export default function QR() {
    const [passid, setpassid] = useState("");
    const [showQRModal, setShowQRModal] = useState(false);
    const [glamfestEmail, setGlamfestEmail] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    function encode(str) {
        let shifted = "";
        for (let i = 0; i < str.length; i++) {
            shifted += String.fromCharCode(str.charCodeAt(i) + 3);
        }
        return btoa(shifted);
    }

    async function generateQR() {
        if (!glamfestEmail || !glamfestEmail.includes("@")) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsGenerating(true);

        try {
            const encodedEmail = encode(glamfestEmail);

            // Generate QR
            const qrDataUrl = await QRCode.toDataURL(encodedEmail, {
                width: 300,
                margin: 1,
            });

            // Create canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const bgImage = new Image();
            const qrImage = new Image();

            bgImage.crossOrigin = "anonymous";
            qrImage.crossOrigin = "anonymous";

            bgImage.src =
                "https://res.cloudinary.com/djpqjisxv/image/upload/v1770193528/WhatsApp_Image_2026-02-04_at_1.51.06_PM_rbrz91.jpg";
            qrImage.src = qrDataUrl;

            await Promise.all([
                new Promise((resolve, reject) => {
                    bgImage.onload = resolve;
                    bgImage.onerror = reject;
                }),
                new Promise((resolve, reject) => {
                    qrImage.onload = resolve;
                    qrImage.onerror = reject;
                }),
            ]);

            // Set canvas size
            canvas.width = bgImage.width;
            canvas.height = bgImage.height;

            // Draw background
            ctx.drawImage(bgImage, 0, 0);

            // QR position & size
            const qrSize = 600;
            const qrX = canvas.width - qrSize - 130;
            const qrY = canvas.height - qrSize - 30;

            ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);


            const safeEmail = glamfestEmail
                .replace(/[^a-z0-9]/gi, "_")
                .toLowerCase();

            const finalImage = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = finalImage;
            link.download = `glamfest-pass-${safeEmail}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("QR Pass downloaded successfully!");
            setShowQRModal(false);
            setGlamfestEmail("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to generate QR");
        } finally {
            setIsGenerating(false);
        }
    }


    return (
        <div className="w-full min-h-screen">
            <PageHeader
                title="GENERATE QR"
                showBackButton={true}
                backPath="/"
                titleDelay={0.2}
                showStars={true}
            />

            <div
                className="
          w-full 
  flex flex-col md:flex-row 
  justify-center items-center 
  gap-12 md:gap-16 
  px-4 py-10
        "
            >
                {/* PROFILE CARD */}
                <div
                    className="w-full max-w-md p-8 sm:p-10 flex flex-col gap-4"
                >
                    <button
                        onClick={() => setShowQRModal(true)}
                        className="
              mt-4 
              w-full 
              bg-[#FED000] 
              text-black 
              py-2 
              rounded-xl 
              text-lg sm:text-xl 
              tracking-wide 
              hover:bg-yellow-400 
              transition
              glow-card
            "
                    >
                        GENERATE GLAMFEST QR
                    </button>
                </div>

                {/* SECOND CARD */}
                {passid && (
                    <div
                        className="
            glow-card 
            w-full max-w-md 
            p-6 sm:p-8 
            rounded-2xl 
            border-4 border-[#FED000] 
            font-['Pirata One'] 
            bg-black/10 
            flex items-center justify-center
          "
                    >
                        {/* INNER BOX */}
                        <div
                            className="
              w-32 sm:w-40 
              h-20 sm:h-28 
              border-4 border-[#FED000] 
              rounded-xl 
              flex items-center justify-center 
              text-[#FED000] 
              text-lg sm:text-xl
            "
                        >
                            {passid}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full flex justify-center px-4 pb-12">
                <div
                    className="
              glow-card 
              w-full max-w-3xl 
              p-6 sm:p-8 
              rounded-2xl 
              border-4 border-[#FED000] 
              font-['Cinzel Decorative'] 
              bg-black/10 
              flex flex-col 
              gap-4
              text-center
            "
                >
                    <h2 className="text-xl sm:text-2xl text-[#FED000] font-bold">
                        ⚠️ IMPORTANT: Valid Pass Registration
                    </h2>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                        You <strong className="text-[#FED000]">MUST</strong> register through the link (via mobile only) below to obtain a valid pass.
                        This registration is <strong className="text-[#FED000]">mandatory</strong> to enter events and attend the star night.
                    </p>
                    <a
                        href="https://myntra.onelink.me/dNYC/psb0vkzt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                mt-2
                w-full 
                bg-[#FED000] 
                text-black 
                py-3 
                rounded-xl 
                text-base sm:text-lg 
                font-bold
                tracking-wide 
                hover:bg-yellow-400 
                transition
                inline-block
              "
                    >
                        REGISTER FOR VALID PASS →
                    </a>
                </div>
            </div>

            {/* QR MODAL */}
            {showQRModal && (
                <div
                    className="
            fixed inset-0 
            bg-black/80 
            flex items-center justify-center 
            z-50 
            p-4
          "
                    onClick={() => setShowQRModal(false)}
                >
                    <div
                        className="
              glow-card 
              w-full max-w-md 
              p-8 
              rounded-2xl 
              border-4 border-[#FED000] 
              font-['Cinzel Decorative'] 
              bg-black/70 
              flex flex-col 
              gap-6
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl sm:text-3xl text-center text-[#FED000] font-bold">
                            Generate Glamfest QR
                        </h2>

                        <p className="text-white text-center text-sm sm:text-base">
                            Enter the email you used while registering for Myntra Glamfest
                        </p>

                        <input
                            type="email"
                            value={glamfestEmail}
                            onChange={(e) => setGlamfestEmail(e.target.value)}
                            placeholder="Enter your Glamfest email"
                            className="
                w-full 
                p-3 
                rounded-xl 
                border-2 border-[#FED000] 
                bg-black/50 
                text-white 
                placeholder-gray-400
                focus:outline-none 
                focus:border-yellow-400
              "
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={generateQR}
                                disabled={isGenerating}
                                className="
                  flex-1 
                  bg-[#FED000] 
                  text-black 
                  py-2 
                  rounded-xl 
                  text-lg 
                  tracking-wide 
                  hover:bg-yellow-400 
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                            >
                                {isGenerating ? "Generating..." : "GENERATE"}
                            </button>

                            <button
                                onClick={() => {
                                    setShowQRModal(false);
                                    setGlamfestEmail("");
                                }}
                                className="
                  flex-1 
                  bg-gray-600 
                  text-white 
                  py-2 
                  rounded-xl 
                  text-lg 
                  tracking-wide 
                  hover:bg-gray-700 
                  transition
                "
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

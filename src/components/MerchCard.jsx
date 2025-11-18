import { useState } from "react";
import { motion } from "framer-motion";

export default function MerchCard({ event, index, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="h-[450px] perspective-1000"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
          onClick={onClick}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
            whileHover={{
              boxShadow: "0px 8px 30px rgba(254, 208, 0, 0.4)",
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#08061E]/100 via-[#301258]/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold font-['Cinzel_Decorative'] text-[#FED000] drop-shadow-lg">
                  {event.name}
                </h3>

                <p className="text-sm text-[#E3CDEC] mt-2 font-['Cinzel_Decorative'] opacity-90">
                  Hover to see details
                </p>
              </div>

              <div className="absolute inset-4 pointer-events-none">
                <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FED000] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FED000] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FED000] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FED000] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "linear-gradient(135deg, #301258 0%, #5C2A9A 50%, #301258 100%)",
            }}
          >
            <div className="relative w-full h-full p-8 flex flex-col">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border-4 border-[#FED000] rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-[#FED000] rounded-full -ml-12 -mb-12" />
              </div>

              <div className="relative z-10 text-center mb-6">
                <h3 className="text-2xl font-bold font-['Cinzel_Decorative'] text-[#FED000]">
                  {event.name}
                </h3>

                <div className="w-16 h-1 bg-linear-to-r from-transparent via-[#FED000] to-transparent mx-auto mt-3" />
              </div>

              <div className="relative z-10 flex-1 space-y-4 h-50">
                <div className="bg-[#08061E]/30 backdrop-blur-sm rounded-xl p-4 border border-[#FED000]/30 h-50 flex flex-col justify-center">
                  <p className="text-[#E3CDEC] text-xs leading-relaxed font-['Cinzel_Decorative'] ">
                    {event.description}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#FED000",
                  boxShadow: "0 0 25px rgba(254, 208, 0, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 mt-4 w-full bg-transparent border-2 border-[#FED000] text-[#FED000] py-3 rounded-xl font-['Cinzel_Decorative'] font-extrabold text-l transition-all shadow-lg hover:text-[#08061E]"
                // for now.. it open's a "merch coming soon.." modal
                onClick={() => {
                  setSelectedEvent(true);
                }}
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#FED000",
                  boxShadow: "0 0 25px rgba(254, 208, 0, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 mt-4 w-full bg-transparent border-2 border-[#FED000] text-[#FED000] py-3 rounded-xl font-['Cinzel_Decorative'] font-bold text-sm transition-all shadow-lg hover:text-[#08061E]"
                // for now.. it open's a "merch coming soon.." modal
                onClick={() => {
                  setSelectedEvent(true);
                }}
              >
                3D VIEW
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/*Popup*/}
      {selectedEvent && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-200"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#08061E]/80 text-[#FED000] rounded-xl p-6 shadow-2xl border border-[#FED000] w-[400px] sm:w-[450px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-2xl font-['Cinzel_Decorative'] mt-4 font-bold pb-5 pt-5">
              MERCH COMING SOON....
            </h2>

            <button
              onClick={() => setSelectedEvent(false)}
              className="mt-4 w-full border border-[#FED000] text-[#FED000] py-2 rounded-lg hover:bg-[#FED000] hover:text-black transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

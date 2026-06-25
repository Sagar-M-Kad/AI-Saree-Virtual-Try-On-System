import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Upload, Sparkles, User, AlertCircle } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

const CameraCapture = () => {
  const { userImage, setUserImage, showToast } = useTryOn();
  const webcamRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);

  // Capture webcam screenshot
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({ width: 600, height: 800 });
      if (imageSrc) {
        setUserImage(imageSrc);
        setIsCameraActive(false);
        showToast('Photo captured successfully!', 'success');
      } else {
        showToast('Failed to capture photo. Please check your webcam.', 'error');
      }
    }
  }, [webcamRef, setUserImage, showToast]);

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File is too large. Maximum size is 5MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        setIsCameraActive(false);
        showToast('Image uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setUserImage(null);
    setIsCameraActive(true);
  };

  const videoConstraints = {
    width: 600,
    height: 800,
    facingMode: "user"
  };

  // Webcam events
  const handleUserMedia = () => {
    setHasPermission(true);
  };

  const handleUserMediaError = (error) => {
    setHasPermission(false);
    console.error("Webcam Error: ", error);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {isCameraActive && !userImage ? (
        <div className="space-y-4">
          
          {/* Webcam Box */}
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-2xl flex flex-col items-center justify-center">
            
            {hasPermission === false ? (
              <div className="p-6 text-center text-slate-300 space-y-4">
                <AlertCircle className="w-12 h-12 text-brand-500 mx-auto" />
                <p className="text-sm font-semibold">Webcam access was denied or is not supported on this device.</p>
                <p className="text-xs text-slate-400">Please use the Upload option below to select a photo from your library.</p>
              </div>
            ) : (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/webp"
                  videoConstraints={videoConstraints}
                  onUserMedia={handleUserMedia}
                  onUserMediaError={handleUserMediaError}
                  className="w-full h-full object-cover"
                />
                
                {/* Silhouette Guide Overlay */}
                <div className="absolute inset-0 border-[6px] border-dashed border-white/20 pointer-events-none flex items-center justify-center">
                  <div className="w-[70%] h-[80%] border-2 border-dashed border-brand-500/50 rounded-[4rem] relative flex items-center justify-center">
                    <div className="absolute top-[10%] w-[30%] h-[22%] border-2 border-brand-400/50 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white/70 font-semibold uppercase bg-brand-600/60 px-1.5 py-0.5 rounded">Face Here</span>
                    </div>
                    <div className="absolute bottom-[5%] w-[80%] h-[55%] border-t-2 border-brand-400/50 rounded-t-[3rem] flex items-center justify-center">
                      <span className="text-[10px] text-white/70 font-semibold uppercase bg-brand-600/60 px-1.5 py-0.5 rounded">Body Alignment</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Float Camera Label */}
            <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white text-xs border border-white/10">
              <Camera className="w-3.5 h-3.5 text-brand-400" />
              <span>Live Capture Room</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            {hasPermission !== false && (
              <button
                onClick={capture}
                className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-brand-700 via-brand-600 to-gold-600 hover:from-brand-800 hover:to-gold-700 text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <Camera className="w-5 h-5" />
                <span>Capture Portrait</span>
              </button>
            )}

            {/* Upload Button */}
            <label className={`w-full py-4 rounded-xl font-semibold border border-slate-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${hasPermission === false ? 'max-w-md mx-auto' : ''}`}>
              <Upload className="w-5 h-5" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Camera Instructions */}
          <div className="max-w-md mx-auto glass-panel p-5 rounded-2xl border border-white/20 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-brand-700 dark:text-gold-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Instructions for a Perfect drape
            </h4>
            <ul className="text-xs text-slate-500 dark:text-zinc-400 text-left space-y-2 list-disc list-inside">
              <li>Stand approximately 6 feet away from the camera.</li>
              <li>Ensure you are standing in a well-lit space facing the camera directly.</li>
              <li>Wear fitted clothing to allow the AI to drape fabric seamlessly.</li>
              <li>Keep your hands relaxed at your sides.</li>
            </ul>
          </div>

        </div>
      ) : (
        <div className="space-y-6">
          {/* Captured Preview */}
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-2xl">
            <img
              src={userImage}
              alt="User captured preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 bg-emerald-500/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white text-xs border border-white/10">
              <User className="w-3.5 h-3.5" />
              <span>Portrait Locked</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleRetake}
              className="w-full py-3.5 rounded-xl font-semibold border border-slate-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <RefreshCw className="w-4.5 h-4.5" />
              <span>Retake / Upload another</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CameraCapture;

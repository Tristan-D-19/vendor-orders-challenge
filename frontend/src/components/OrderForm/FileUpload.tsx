
interface FileUploadProps {
  setFile?: (file: File) => void;
  file: File| null }

const FileUpload: React.FC<FileUploadProps> = ({setFile, file}) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type !== "text/csv") {
        alert("Please upload a valid CSV file");
        return;
      }
      if (setFile) {
        setFile(uploadedFile);
      }
    }
  };


    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center px-6 py-12">
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md">
            <div className="flex flex-col mb-8 text-center">
              <h1 className="mb-6 text-xl font-bold text-gray-700">Upload a File</h1>
              <p className="text-xs font-medium text-gray-500">Supported formats: .csv</p>
              <p className="text-xs font-medium ">file name:<span className="font-bold text-blue-600"> {file ? file.name: ""}</span></p>
            </div>

            <form >
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center px-4 py-6 tracking-wide uppercase transition-colors duration-200 transform bg-gray-200 rounded-lg shadow-md cursor-pointer text-blue hover:bg-blue hover:text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 8V0H7v8H2l8 8 8-8h-5z"></path>
                  </svg>
                  <span className="mt-2 text-base leading-normal">Select a file</span>
                  <input type='file' accept='csv' className="hidden" name="file"
                 onChange={handleFileChange}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default FileUpload;

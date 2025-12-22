import React, { useState } from 'react';
import { FiUpload, FiCheck } from 'react-icons/fi';

const ProductCustomization = ({ product, onCustomizationUpdate }) => {
  const [customizations, setCustomizations] = useState({
    type: '',
    finish: '',
    thickness: '',
    designFile: null,
    instructions: '',
    designPreview: null
  });

  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleOptionSelect = (category, optionId) => {
    const newCustomizations = {
      ...customizations,
      [category]: optionId
    };
    setCustomizations(newCustomizations);
    onCustomizationUpdate(newCustomizations);
  };

  const handleDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomizations(prev => ({
          ...prev,
          designFile: file,
          designPreview: e.target.result
        }));
        
        onCustomizationUpdate({
          ...customizations,
          designFile: file,
          designPreview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstructionsChange = (e) => {
    const newValue = e.target.value;
    setCustomizations(prev => ({
      ...prev,
      instructions: newValue
    }));
    onCustomizationUpdate({
      ...customizations,
      instructions: newValue
    });
  };

  const calculateAdditionalPrice = () => {
    let additional = 0;
    
    // Type price
    const selectedType = product.customizationOptions.type.options.find(
      opt => opt.id === customizations.type
    );
    if (selectedType) additional += selectedType.price;
    
    // Finish price
    const selectedFinish = product.customizationOptions.finish.options.find(
      opt => opt.id === customizations.finish
    );
    if (selectedFinish) additional += selectedFinish.price;
    
    // Thickness price
    const selectedThickness = product.customizationOptions.thickness.options.find(
      opt => opt.id === customizations.thickness
    );
    if (selectedThickness) additional += selectedThickness.price;
    
    return additional;
  };

  const additionalPrice = calculateAdditionalPrice();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        ✨ Customize Your {product.name}
      </h3>
      
      {/* Type Selection */}
      <div className="mb-8">
        <h4 className="font-bold mb-4 text-lg">{product.customizationOptions.type.title} *</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.customizationOptions.type.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect('type', option.id)}
              className={`border-2 rounded-lg p-4 text-left transition-all hover:shadow-md ${
                customizations.type === option.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{option.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                {customizations.type === option.id && (
                  <FiCheck className="text-orange-500" size={20} />
                )}
              </div>
              <div className="mt-3">
                <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.name}
                      className="h-full w-full object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x100?text=' + option.name;
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-2">📷</div>
                      <p className="text-sm">{option.name} Sample</p>
                    </div>
                  )}
                </div>
                <p className="text-right font-bold text-orange-500">
                  {option.price > 0 ? `+₱${option.price}` : 'Included'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Finish Selection */}
      <div className="mb-8">
        <h4 className="font-bold mb-4 text-lg">{product.customizationOptions.finish.title} *</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.customizationOptions.finish.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect('finish', option.id)}
              className={`border-2 rounded-lg p-4 text-left transition-all hover:shadow-md ${
                customizations.finish === option.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{option.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                {customizations.finish === option.id && (
                  <FiCheck className="text-orange-500" size={20} />
                )}
              </div>
              <div className="mt-3">
                <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.name}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-2">🎨</div>
                      <p className="text-sm">{option.name} Sample</p>
                    </div>
                  )}
                </div>
                <p className="text-right font-bold text-orange-500">
                  {option.price > 0 ? `+₱${option.price}` : 'Included'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Thickness Selection */}
      <div className="mb-8">
        <h4 className="font-bold mb-4 text-lg">{product.customizationOptions.thickness.title} *</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.customizationOptions.thickness.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect('thickness', option.id)}
              className={`border-2 rounded-lg p-4 text-left transition-all hover:shadow-md ${
                customizations.thickness === option.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{option.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                {customizations.thickness === option.id && (
                  <FiCheck className="text-orange-500" size={20} />
                )}
              </div>
              <div className="mt-3">
                <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.name}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-2">📏</div>
                      <p className="text-sm">Thickness: {option.id}</p>
                    </div>
                  )}
                </div>
                <p className="text-right font-bold text-orange-500">
                  {option.price > 0 ? `+₱${option.price}` : 'Included'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Design Upload */}
      <div className="mb-8">
        <h4 className="font-bold mb-4 text-lg">{product.customizationOptions.design.title} *</h4>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
          <input
            type="file"
            id="design-upload"
            accept={product.customizationOptions.design.accept}
            onChange={handleDesignUpload}
            className="hidden"
          />
          
          {!customizations.designPreview ? (
            <label htmlFor="design-upload" className="cursor-pointer block">
              <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="font-medium mb-2">Click to upload your design</p>
              <p className="text-sm text-gray-500 mb-4">
                {product.customizationOptions.design.description}
              </p>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                Choose File
              </button>
            </label>
          ) : (
            <div>
              <div className="mb-4">
                <img 
                  src={customizations.designPreview} 
                  alt="Design preview"
                  className="mx-auto max-h-48 rounded-lg shadow-sm"
                />
              </div>
              <p className="font-medium mb-2">✓ Design uploaded: {uploadedFileName}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setCustomizations(prev => ({ ...prev, designFile: null, designPreview: null }));
                    setUploadedFileName('');
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
                <label htmlFor="design-upload" className="text-orange-500 hover:text-orange-700 cursor-pointer">
                  Change File
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Special Instructions */}
      <div className="mb-6">
        <h4 className="font-bold mb-4 text-lg">{product.customizationOptions.instructions.title}</h4>
        <textarea
          value={customizations.instructions}
          onChange={handleInstructionsChange}
          placeholder={product.customizationOptions.instructions.placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 h-32"
        />
      </div>
      
      {/* Additional Price Summary */}
      {additionalPrice > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-2">Additional Customization Charges</h4>
          <div className="space-y-1">
            {customizations.type && (
              <div className="flex justify-between">
                <span>Cut Type:</span>
                <span>+₱{
                  product.customizationOptions.type.options.find(
                    opt => opt.id === customizations.type
                  )?.price || 0
                }</span>
              </div>
            )}
            {customizations.finish && (
              <div className="flex justify-between">
                <span>Finish:</span>
                <span>+₱{
                  product.customizationOptions.finish.options.find(
                    opt => opt.id === customizations.finish
                  )?.price || 0
                }</span>
              </div>
            )}
            {customizations.thickness && (
              <div className="flex justify-between">
                <span>Thickness:</span>
                <span>+₱{
                  product.customizationOptions.thickness.options.find(
                    opt => opt.id === customizations.thickness
                  )?.price || 0
                }</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total Additional:</span>
                <span className="text-orange-500">+₱{additionalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Validation Status */}
      <div className={`p-4 rounded-lg ${
        customizations.type && customizations.finish && customizations.thickness && customizations.designFile
          ? 'bg-green-50 text-green-800'
          : 'bg-yellow-50 text-yellow-800'
      }`}>
        {customizations.type && customizations.finish && customizations.thickness && customizations.designFile ? (
          <p className="font-medium">✓ All customization options selected. Ready to proceed!</p>
        ) : (
          <p className="font-medium">Please select all required customization options (*)</p>
        )}
      </div>
    </div>
  );
};

export default ProductCustomization;
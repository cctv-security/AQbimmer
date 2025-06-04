import React, { useState, useEffect } from 'react';
import bmwModels from '../../data/bmw_models.json';
import bmwYearsGenerations from '../../data/bmw_years_generations.json';
import bmwActivations from '../../data/bmw_activations.json';

interface ModelSelectorProps {
  onSelectionChange: (selection: {
    model: string;
    modelName: string;
    year: string;
    yearText: string;
    generation: string;
    generationText: string;
    activations: Array<{
      title: string;
      description: string;
      category: string;
      price?: string;
    }>;
  }) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onSelectionChange }) => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedModelName, setSelectedModelName] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedYearText, setSelectedYearText] = useState<string>('');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedGenerationText, setSelectedGenerationText] = useState<string>('');

  const [availableYears, setAvailableYears] = useState<Array<{ value: string, text: string }>>([]);
  const [availableGenerations, setAvailableGenerations] = useState<Array<{ value: string, text: string }>>([]);
  const [availableActivations, setAvailableActivations] = useState<Array<{
    title: string;
    description: string;
    category: string;
    price?: string;
  }>>([]);

  // *** تم إزالة حالة isSelectorActive لأننا لا نريد إخفاء المكون في البداية ***
  // const [isSelectorActive, setIsSelectorActive] = useState(false); 

  // عند تغيير السلسلة المختارة
  useEffect(() => {
    if (selectedModel) {
      const modelData = bmwYearsGenerations[selectedModel as keyof typeof bmwYearsGenerations];
      if (modelData) {
        setAvailableYears(modelData.years);
        setSelectedYear('');
        setSelectedYearText('');
        setSelectedGeneration('');
        setSelectedGenerationText('');
        setAvailableGenerations([]);
        setAvailableActivations([]);
      } else {
        setAvailableYears([]);
      }
    } else {
      setAvailableYears([]);
      setSelectedYear('');
      setSelectedYearText('');
      setAvailableGenerations([]);
      setSelectedGeneration('');
      setSelectedGenerationText('');
      setAvailableActivations([]);
    }
  }, [selectedModel]);

  // عند تغيير السنة المختارة
  useEffect(() => {
    if (selectedModel && selectedYear) {
      const modelData = bmwYearsGenerations[selectedModel as keyof typeof bmwYearsGenerations];
      if (modelData) {
        const yearData = modelData.years.find(year => year.value === selectedYear);
        if (yearData) {
          setAvailableGenerations(yearData.generations);
          setSelectedGeneration('');
          setSelectedGenerationText('');
          setAvailableActivations([]);
        } else {
          setAvailableGenerations([]);
        }
      }
    } else {
      setAvailableGenerations([]);
      setSelectedGeneration('');
      setSelectedGenerationText('');
      setAvailableActivations([]);
    }
  }, [selectedModel, selectedYear]);

  // عند تغيير الجيل المختار
  useEffect(() => {
    if (selectedModel && selectedYear && selectedGeneration) {
      const activationData = bmwActivations.find(
        item => item.model === selectedModel &&
                item.year === selectedYear &&
                item.generation === selectedGeneration
      );
      if (activationData) {
        setAvailableActivations(activationData.activations);
      } else {
        setAvailableActivations([]);
      }
    } else {
      setAvailableActivations([]);
    }
  }, [selectedModel, selectedYear, selectedGeneration]);

  // إرسال التغييرات للمكون الأب
  useEffect(() => {
    if (selectedModel && selectedYear && selectedGeneration) {
      onSelectionChange({
        model: selectedModel,
        modelName: selectedModelName,
        year: selectedYear,
        yearText: selectedYearText,
        generation: selectedGeneration,
        generationText: selectedGenerationText,
        activations: availableActivations
      });
    }
  }, [selectedModel, selectedYear, selectedGeneration, availableActivations, onSelectionChange, selectedModelName, selectedYearText, selectedGenerationText]);

  // معالجة تغيير السلسلة
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedModel(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedModelName(selectedOption.text);
  };

  // معالجة تغيير السنة
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedYear(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedYearText(selectedOption.text);
  };

  // معالجة تغيير الجيل
  const handleGenerationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGeneration(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedGenerationText(selectedOption.text);
  };

  return (
    // *** تم إزالة منطق الإخفاء/الإظهار على الـ div الغلاف ***
    <div
      className={`relative bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg`}
      // *** تم إزالة onMouseEnter و onMouseLeave ***
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-white">اختر سيارتك</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* اختيار السلسلة */}
        <div className="space-y-2 relative z-30"> {/* زيادة z-index هنا */}
          <label htmlFor="model-select" className="block text-white font-medium">
            سلسلة BMW
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={handleModelChange}
            className="w-full p-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          >
            <option value="">اختر السلسلة</option>
            {bmwModels.map((model) => (
              <option key={model.value} value={model.value}>
                {model.text}
              </option>
            ))}
          </select>
        </div>

        {/* اختيار السنة */}
        <div className="space-y-2 relative z-20"> {/* زيادة z-index هنا */}
          <label htmlFor="year-select" className="block text-white font-medium">
            سنة الإنتاج
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            disabled={!selectedModel}
            className="w-full p-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            dir="rtl"
          >
            <option value="">اختر السنة</option>
            {availableYears.map((year) => (
              <option key={year.value} value={year.value}>
                {year.text}
              </option>
            ))}
          </select>
        </div>

        {/* اختيار الجيل */}
        <div className="space-y-2 relative z-10"> {/* زيادة z-index هنا */}
          <label htmlFor="generation-select" className="block text-white font-medium">
            الجيل
          </label>
          <select
            id="generation-select"
            value={selectedGeneration}
            onChange={handleGenerationChange}
            disabled={!selectedYear}
            className="w-full p-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            dir="rtl"
          >
            <option value="">اختر الجيل</option>
            {availableGenerations.map((generation) => (
              <option key={generation.value} value={generation.value}>
                {generation.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* عرض عدد التفعيلات المتاحة */}
      {availableActivations.length > 0 && (
        <div className="mt-4 text-center">
          <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            {availableActivations.length} تفعيل متاح
          </span>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
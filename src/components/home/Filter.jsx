import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Input, Card, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';

const { Option } = Select;

const Filter = () => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [step, setStep] = useState(1);  // Track the step the user is on
  const [packageType, setPackageType] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);

  // Static Data for Packages with Event Planner Info
  const packages = {
    stay: [
      { id: 1, name: 'Basic Stay', description: 'A comfortable stay for 2 nights', price: 100, planner: 'StayPlanners Inc.' },
      { id: 2, name: 'Premium Stay', description: 'A luxurious stay with breakfast included', price: 200, planner: 'StayPlanners Inc.' },
    ],
    event: [
      { id: 3, name: 'Birthday Event', description: 'An unforgettable birthday celebration', price: 150, planner: 'EventMasters Ltd.' },
      { id: 4, name: 'Wedding Event', description: 'A grand wedding event with all amenities', price: 500, planner: 'EventMasters Ltd.' },
      { id: 5, name: 'Corporate Event', description: 'A professional corporate event package', price: 350, planner: 'EventElite Co.' },
      { id: 6, name: 'Anniversary Event', description: 'A memorable anniversary celebration', price: 250, planner: 'EventElite Co.' },
    ],
  };

  // Watch the selected values for debugging
  console.log("Package Type:", watch('packageType'));
  console.log("Selected Package:", watch('selectedPackage'));

  const onSubmit = (data) => {
    console.log(data);
    // Redirect to payment or proceed further after form submission
  };

  useEffect(() => {
    if (packageType) {
      // Filter packages based on packageType selection
      setFilteredPackages(packages[packageType] || []);
    }
  }, [packageType]); // This will only run when packageType changes

  const handlePackageTypeChange = (value) => {
    if (value !== packageType) {
      setPackageType(value);
      setSelectedPackage(null); // Reset selected package when package type changes
      setValue('selectedPackage', null); // Reset the form value for selected package
    }
  };

  const handlePackageSelectChange = (value) => {
    setSelectedPackage(value);
    setValue('selectedPackage', value); // Update selectedPackage in the form state
  };

  const handleNextStep = () => {
    if (step === 1 && selectedPackage) {
      setStep(2);  // Move to Step 2 when a package is selected
    }
    if (step === 2 && watch('names') && watch('checkInDate') && watch('desiredDate')) {
      setStep(3);  // Move to Step 3 when user details are filled
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6 mt-[80px] md:my-[150px]">
      <h2 className="text-2xl md:!text-4xl font-semibold text-center mb-6">Book Your Event or Stay</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Step 1: Package Type Selection */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Choose a Package</label>
              <Controller
                name="packageType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full mt-2 h-[45px]"
                    placeholder="Select Package Type"
                    onChange={handlePackageTypeChange}
                    value={packageType}
                  >
                    <Option value="stay">Stay</Option>
                    <Option value="event">Event</Option>
                  </Select>
                )}
              />
            </div>

            {/* Price Range Selection */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Select Price Range</label>
              <Controller
                name="priceRange"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full mt-2 h-[45px]"
                    placeholder="Select Price Range"
                    onChange={(value) => setValue('priceRange', value)}
                  >
                    <Option value="100">Up to $100</Option>
                    <Option value="200">Up to $200</Option>
                    <Option value="300">Up to $300</Option>
                    <Option value="500">Up to $500</Option>
                  </Select>
                )}
              />
            </div>

            {/* Filtered Packages Display */}
            {packageType && filteredPackages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Available Packages:</h3>
                <Row gutter={[16, 16]}>
                  {filteredPackages.map((pkg) => (
                    <Col span={12} key={pkg.id}>
                      <Card
                        className={`shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${selectedPackage === pkg.id ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => handlePackageSelectChange(pkg.id)}
                        hoverable
                      >
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                        <p className="text-md font-semibold mt-2">Price: ${pkg.price}</p>
                        <p className="text-sm text-gray-500 mt-2">Event Planner: {pkg.planner}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        )}

        {/* Step 2: User Details */}
        {step === 2 && selectedPackage && (
          <>
           {/* Display the selected package */}
           {selectedPackage && (
              <div className="mt-6 p-4 border-2 border-blue-500">
                <h4 className="font-semibold text-lg">Selected Package:</h4>
                <p><strong>Name:</strong> {filteredPackages.find(pkg => pkg.id === selectedPackage)?.name}</p>
                <p><strong>Description:</strong> {filteredPackages.find(pkg => pkg.id === selectedPackage)?.description}</p>
                <p><strong>Price:</strong> ${filteredPackages.find(pkg => pkg.id === selectedPackage)?.price}</p>
                <p><strong>Event Planner:</strong> {filteredPackages.find(pkg => pkg.id === selectedPackage)?.planner}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Names</label>
              <Controller
                name="names"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-full mt-2 h-[45px]"
                    placeholder="Enter Names"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
              <Controller
                name="checkInDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="w-full mt-2 h-[45px]"
                    onChange={(date) => setValue('checkInDate', date)}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Desired Date (if different)</label>
              <Controller
                name="desiredDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="w-full mt-2 h-[45px]"
                    onChange={(date) => setValue('desiredDate', date)}
                  />
                )}
              />
            </div>

           
          </>
        )}

        {/* Step 3: Proceed to Payment */}
        {step === 2 && (
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-6 bg-blue-600 text-white h-[45px]"
          >
            Proceed to Payment
          </Button>
        )}

        {/* Next Button to proceed to the next step */}
        {(step === 1 ) && (
          <Button
            type="default"
            block
            className="mt-6"
            onClick={handleNextStep}
            disabled={!selectedPackage && step === 1}
            classNames="h-[45px]"
          >
            Next
          </Button>
        )}

      </form>
    </div>
  );
};

export default Filter;

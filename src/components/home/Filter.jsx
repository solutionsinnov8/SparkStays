import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Input, Card, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const { Option } = Select;

const Filter = () => {
  const { control, handleSubmit, setValue, watch, reset, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [step, setStep] = useState(1);
  const [packageType, setPackageType] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const priceRange = watch('priceRange');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages');
        setAllPackages(res.data);
      } catch (err) {
        console.error('Failed to fetch packages', err);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    if (packageType && allPackages.length > 0) {
      let filtered = allPackages.filter(pkg => pkg.type === packageType);

      if (priceRange) {
        const maxPrice = parseInt(priceRange, 10);
        filtered = filtered.filter(pkg => pkg.price <= maxPrice);
      }

      setFilteredPackages(filtered);
    }
  }, [packageType, priceRange, allPackages]);

  const handlePackageTypeChange = (value) => {
    if (value !== packageType) {
      setPackageType(value);
      setSelectedPackage(null);
      setValue('selectedPackage', null);
    }
  };

  const handlePackageSelectChange = (value) => {
    setSelectedPackage(value);
    setValue('selectedPackage', value);
  };

  const handleNextStep = () => {
    if (step === 1 && selectedPackage) {
      setStep(2);
    }
    if (step === 2 && watch('names') && watch('checkInDate') && watch('desiredDate')) {
      setStep(3);
    }
  };

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        guestName: data.names,
        checkInDate: data.checkInDate,
        desiredDate: data.desiredDate,
        packageType: packageType,
        packageId: selectedPackage,
        priceRange: data.priceRange,
        status: 'pending',
        date: data.checkInDate || new Date(),
        user: "guest"
      };

      const response = await api.post('/bookings', bookingData);
      console.log('Booking created:', response.data);
      toast.success('Booking successfully submitted!');
      reset();
      setStep(1);
      setPackageType(null);
      setSelectedPackage(null);
    } catch (error) {
      console.error('Failed to submit booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6 mt-[80px] md:my-[150px]">
      <h2 className="text-2xl md:!text-4xl font-semibold text-center mb-6">Book Your Event or Stay</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Choose a Package</label>
              <Controller
                name="packageType"
                control={control}
                rules={{ required: 'Package Type is required' }}
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
              {errors.packageType && <p className="text-red-500 text-xs mt-2">{errors.packageType.message}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Select Price Range</label>
              <Controller
                name="priceRange"
                control={control}
                rules={{ required: 'Price Range is required' }}
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
              {errors.priceRange && <p className="text-red-500 text-xs mt-2">{errors.priceRange.message}</p>}
            </div>

            {/* Display Filtered Packages */}
            {packageType && filteredPackages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Available Packages:</h3>
                <Row gutter={[16, 16]}>
                  {filteredPackages.map((pkg) => (
                    <Col span={12} key={pkg._id}>
                      <Card
                        className={`shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${selectedPackage === pkg._id ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => handlePackageSelectChange(pkg._id)}
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

        {/* Step 2 */}
        {step === 2 && selectedPackage && (
          <>
            <div className="mt-6 p-4 border-2 border-blue-500">
              <h4 className="font-semibold text-lg">Selected Package:</h4>
              {(() => {
                const selected = filteredPackages.find(pkg => pkg._id === selectedPackage);
                return selected ? (
                  <>
                    <p><strong>Name:</strong> {selected.name}</p>
                    <p><strong>Description:</strong> {selected.description}</p>
                    <p><strong>Price:</strong> ${selected.price}</p>
                    <p><strong>Event Planner:</strong> {selected.planner}</p>
                  </>
                ) : null;
              })()}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Names</label>
              <Controller
                name="names"
                control={control}
                rules={{ required: 'Names are required' }}
                render={({ field }) => (
                  <Input {...field} className="w-full mt-2 h-[45px]" placeholder="Enter Names" />
                )}
              />
              {errors.names && <p className="text-red-500 text-xs mt-2">{errors.names.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
              <Controller
                name="checkInDate"
                control={control}
                rules={{ required: 'Check-in Date is required' }}
                render={({ field }) => (
                  <DatePicker {...field} className="w-full mt-2 h-[45px]" onChange={(date) => setValue('checkInDate', date)} />
                )}
              />
              {errors.checkInDate && <p className="text-red-500 text-xs mt-2">{errors.checkInDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Desired Date (if different)</label>
              <Controller
                name="desiredDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} className="w-full mt-2 h-[45px]" onChange={(date) => setValue('desiredDate', date)} />
                )}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
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

        {/* Next Button */}
        {step === 1 && (
          <Button
            type="default"
            block
            className="mt-6 h-[45px]"
            onClick={handleNextStep}
            disabled={!selectedPackage}
          >
            Next
          </Button>
        )}
      </form>
    </div>
  );
};

export default Filter;

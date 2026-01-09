import { registerVoter } from "@/api/voter/registerVoterApi";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { Calendar1Icon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterVoterPage = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    head_of_family: "",
    mobile_no: "",
    aadhar_no: "",
    dob: null,
    age: "",
    prabhag_no: "",
    house_no: "",
    religion: "",
    caste: "",
    category: ""
  });

  const calculateAge = (dob) => {
    if (!dob) return "";

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnCancel = () => {
    setData({
        fullname: "",
        email: "",
        head_of_family: "",
        mobile_no: "",
        aadhar_no: "",
        dob: null,
        age: "",
        prabhag_no: "",
        house_no: "",
        religion: "",
        caste: "",
        category: ""
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const ageNumber = data.age !== "" ? Number(data.age) : undefined;
      const prabhagNumber = data.prabhag_no !== "" ? Number(data.prabhag_no) : undefined;

      if (ageNumber === undefined || Number.isNaN(ageNumber) || ageNumber < 18) {
        setLoading(false);
        toast.error("Please select a valid Date of Birth (age must be >= 18)");
        return;
      }

      if (prabhagNumber === undefined || Number.isNaN(prabhagNumber) || prabhagNumber < 1) {
        setLoading(false);
        toast.error("Prabhag number is required and must be a positive number");
        return;
      }

      const submittedData = {
        ...data,
        dob: data.dob ? format(data.dob, "yyyy-MM-dd") : null,
        age: ageNumber,
        prabhag_no: prabhagNumber,
      };

      const voter = await registerVoter(submittedData);
      setData({
        fullname: "",
        email: "",
        head_of_family: "",
        mobile_no: "",
        aadhar_no: "",
        dob: null,
        age: "",
        prabhag_no: "",
        house_no: "",
        religion: "",
        caste: "",
        category: ""
      });
      if (voter.success === false) {
        throw new Error(voter?.message || "Voter registration failed");
      }
      navigate("/voter/dashboard");
      toast.success(voter?.message || "Voter registered successfully");
    } catch (error) {
      toast.error(error.message || "Voter registration failed");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      { isAuthenticated ?
        <form onSubmit={handleSubmit}>
        <FieldGroup orientation="vertical" className="space-y-6">
          <FieldSet>
            <FieldLegend>Enter Voter Information</FieldLegend>
            <FieldDescription>
              Please enter your full legal name. Double-check all details for
              accuracy — this information will be used to verify your identity
              and register your vote. Your data is stored securely and only used
              for election purposes.
            </FieldDescription>
            <FieldSeparator />

            <FieldGroup>
              <FieldSet>
                <FieldLegend>Personal Details</FieldLegend>
                <FieldDescription>
                  Fill in all the required fields below.
                </FieldDescription>
                <FieldSeparator />
                <Field>
                  <FieldLabel htmlFor="fullname">Fullname</FieldLabel>
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="First Middle Last"
                    value={data.fullname}
                    onChange={handleOnChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    placeholder="(eg.johndoe12@example.com)"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="hof">Head of Family</FieldLabel>
                  <Input
                    id="hof"
                    placeholder="Enter name of that person"
                    value={data.head_of_family}
                    name="head_of_family"
                    onChange={handleOnChange}
                    required
                  />
                </Field>
                <div className="flex flex-col md:flex-row gap-4">
                  <Field>
                    <FieldLabel htmlFor="mobile">Mobile</FieldLabel>
                    <Input
                      id="mobile"
                      name="mobile_no"
                      placeholder="Exclude country code (eg.1234567890)"
                      value={data.mobile_no}
                      onChange={handleOnChange}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="aadhar">Aadhar Number</FieldLabel>
                    <Input
                      id="aadhar"
                      placeholder="Enter your Aadhar number"
                      name="aadhar_no"
                      value={data.aadhar_no}
                      onChange={handleOnChange}
                      required
                    />
                  </Field>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <Field>
                    <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="dob"
                          name="dob"
                          className="w-full md:w-48 justify-between font-normal cursor-pointer"
                        >
                          {data.dob
                            ? format(data.dob, "dd-MM-yyyy")
                            : "Select date"}
                          <Calendar1Icon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={data.dob}
                          onSelect={(selectedDate) => {
                            const calculatedAge = calculateAge(selectedDate);

                            setData((prev) => ({
                              ...prev,
                              dob: selectedDate,
                              age: calculatedAge,
                            }));

                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="age">Age</FieldLabel>
                    <Input
                      id="age"
                      placeholder="Select date of birth to calculate age"
                      name="age"
                      className="w-full md:w-32"
                      disabled={!data.dob}
                      value={data.age}
                      readOnly
                    />
                  </Field>
                </div>
              </FieldSet>

              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Address Details</FieldLegend>
                <FieldDescription>
                  Provide your current residential address. Ensure all details
                  are accurate to avoid any issues with voter registration.
                </FieldDescription>
                <FieldSeparator />
                <div className="space-y-4 flex flex-col md:flex-row gap-4 md:space-y-0">
                  <Field>
                    <FieldLabel htmlFor="prabhagNo">Prabhag No.</FieldLabel>
                    <Input
                      id="prabhagNo"
                      name="prabhag_no"
                      type="number"
                      value={data.prabhag_no}
                      onChange={handleOnChange}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="houseNo">House No.</FieldLabel>
                    <Input
                      id="houseNo"
                      name="house_no"
                      value={data.house_no}
                      onChange={handleOnChange}
                      required
                    />
                  </Field>
                </div>
              </FieldSet>

              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Community Details</FieldLegend>
                <FieldDescription>
                  Provide demographic details — religion, caste and subcaste —
                  used for constituency classification.
                </FieldDescription>
                <FieldSeparator />
                <div className="space-y-4 flex flex-col md:flex-row gap-4 md:space-y-0">
                  <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Select
                      id="category"
                      name="category"
                      value={data.category}
                      onValueChange={(value) =>
                        setData({ ...data, category: value })
                      }
                    >
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select your category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="religion">Religion</FieldLabel>
                    <Select
                      id="religion"
                      name="religion"
                      value={data.religion}
                      onValueChange={(value) =>
                        setData({ ...data, religion: value })
                      }
                    >
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Muslim">Muslim</SelectItem>
                        <SelectItem value="Christian">Christian</SelectItem>
                        <SelectItem value="Sikh">Sikh</SelectItem>
                        <SelectItem value="Jain">Jain</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="caste">Caste</FieldLabel>
                    <Select
                      id="caste"
                      name="caste"
                      value={data.caste}
                      onValueChange={(value) =>
                        setData({ ...data, caste: value })
                      }
                    >
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select your caste" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Maratha">Maratha</SelectItem>
                        <SelectItem value="Muslim">Muslim</SelectItem>
                        <SelectItem value="Baudh">Baudh</SelectItem>
                        <SelectItem value="Banjara">Banjara</SelectItem>
                        <SelectItem value="Dhangar">Dhangar</SelectItem>
                        <SelectItem value="Komti">Komti</SelectItem>
                        <SelectItem value="Marwadi">Marwadi</SelectItem>
                        <SelectItem value="Kumbhar">Kumbhar</SelectItem>
                        <SelectItem value="Sonar">Sonar</SelectItem>
                        <SelectItem value="Warik">Warik</SelectItem>
                        <SelectItem value="Aadiwasi">Aadiwasi</SelectItem>
                        <SelectItem value="Harkar">Harkar</SelectItem>
                        <SelectItem value="Bhoi">Bhoi</SelectItem>
                        <SelectItem value="Dhobi">Dhobi</SelectItem>
                        <SelectItem value="Matang">Matang</SelectItem>
                        <SelectItem value="Jungam">Jungam</SelectItem>
                        <SelectItem value="Wani">Wani</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldSet>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <Field orientation="vertical">
            <Button type="submit" className="cursor-pointer">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting Details..." : "Submit Details"}
            </Button>
            <Button onClick={handleOnCancel} variant="outline" type="button" className="cursor-pointer">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form> : 
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Please log in to access the Voter Registration Page.</p>
            <p>Redirecting to Login Page... </p>
            {setTimeout(() => {
              navigate("/auth");
              toast.warning(<b>Your session has expired!!</b>+"Please login to access Voter Registration Page");
            }, 2000)}
        </div>
      }
    </div>
  );
};

export default RegisterVoterPage;

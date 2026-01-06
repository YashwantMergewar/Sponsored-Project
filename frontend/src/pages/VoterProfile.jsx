import { useAuth } from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVoterById, updateVoter } from "@/api/voter/registerVoterApi";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Calendar1Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const VoterProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { voterId } = useParams();
  const [voter, setVoter] = useState(null);
  const [isAgeCalculate, setIsAgeCalculate] = useState(false);
  const [formData, setFormData] = useState({});
  const [editField, setEditField] = useState(null);
  const [open, setOpen] = useState(false);

  const toInputDate = (dob) => {
    if (!dob) return "";
    const d = new Date(dob);
    if (isNaN(d)) return "";
    return d.toISOString().slice(0, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fields = [
        "fullname",
        "email",
        "head_of_family",
        "mobile_no",
        "aadhar_no",
        "dob",
        "age",
        "religion",
        "caste",
        "category",
        "prabhag_no",
        "house_no",
      ];
      const payload = {};

      fields.forEach((f) => {
        const newVal = formData[f] ?? "";

        const orig =
          f === "dob" ? toInputDate(voter?.dob) : String(voter?.[f] ?? "");

        const formattedNewVal =
          f === "dob" ? toInputDate(newVal) : String(newVal);

        if (formattedNewVal !== orig) {
          payload[f] = formattedNewVal;
        }
      });

      if (Object.keys(payload).length === 0) {
        toast.warning("No changes to update");
        return;
      }

      if (payload.age !== undefined) {
        const n = Number(payload.age);
        if (!Number.isNaN(n)) payload.age = n;
      }

      await updateVoter(voterId, payload);
      toast.success("Voter updated successfully");
      const res = await getVoterById(voterId);
      const fetched = Array.isArray(res?.voters) ? res.voters[0] : res?.voters;
      setVoter(fetched);
      setFormData({ ...fetched, dob: toInputDate(fetched?.dob) });
      setEditField(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update voter");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "";

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    setIsAgeCalculate(age);
    return age;
  };

  const formatDOB = (dob) => {
    if (!dob) return "";
    const d = new Date(dob);
    if (isNaN(d)) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchVoterById = async () => {
      try {
        setLoading(true);
        const res = await getVoterById(voterId);
        const fetched = Array.isArray(res?.voters)
          ? res.voters[0]
          : res?.voters;
        setVoter(fetched);
        console.log(fetched);
      } catch (error) {
        console.log(error);
        console.error("Error fetching voter details:", error);
        toast.error(error.message || "Failed to fetch voter");
      } finally {
        setLoading(false);
      }
    };
    fetchVoterById();
  }, [voterId]);

  useEffect(() => {
    if (voter) {
      setFormData({ ...voter, dob: toInputDate(voter.dob) });
    }
  }, [voter]);
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <FieldGroup orientation="vertical" className="space-y-6">
            <FieldSet>
              <FieldLegend>Voter Profile</FieldLegend>
              <FieldDescription>
                Complete voter details. You are able to update the details
              </FieldDescription>
              <FieldSeparator />

              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Personal Details</FieldLegend>
                  <FieldSeparator />
                  <Field>
                    <FieldLabel htmlFor="fullname">Fullname</FieldLabel>
                    <div className="relative group">
                      {editField === "fullname" ? (
                        <Input
                          id="fullname"
                          type="text"
                          value={formData.fullname ?? ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullname: e.target.value,
                            })
                          }
                          className="w-full mt-1 border rounded px-2 py-1"
                        />
                      ) : (
                        <p className="text-gray-900 mt-1 text-left">
                          {voter?.fullname}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setEditField(
                            editField === "fullname" ? null : "fullname"
                          )
                        }
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                        aria-label="Edit fullname"
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative group">
                      {editField === "email" ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email ?? ""}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full mt-1 border rounded px-2 py-1"
                        />
                      ) : (
                        <p className="text-gray-900 mt-1 text-left">
                          {voter?.email}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setEditField(editField === "email" ? null : "email")
                        }
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                        aria-label="Edit email"
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="hof">Head of Family</FieldLabel>
                    <div className="relative group">
                      {editField === "head_of_family" ? (
                        <Input
                          id="hof"
                          type="text"
                          value={formData.head_of_family ?? ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              head_of_family: e.target.value,
                            })
                          }
                          className="w-full mt-1 border rounded px-2 py-1"
                        />
                      ) : (
                        <p className="text-gray-900 mt-1 text-left">
                          {voter?.head_of_family}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setEditField(
                            editField === "head_of_family"
                              ? null
                              : "head_of_family"
                          )
                        }
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                        aria-label="Edit head of family"
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </Field>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Field>
                      <FieldLabel htmlFor="mobile">Mobile</FieldLabel>
                      <div className="relative group">
                        {editField === "mobile_no" ? (
                          <Input
                            id="mobile"
                            type="text"
                            value={formData.mobile_no ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobile_no: e.target.value,
                              })
                            }
                            className="w-full mt-1 border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.mobile_no}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(
                              editField === "mobile_no" ? null : "mobile_no"
                            )
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit mobile"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="aadhar">Aadhar Number</FieldLabel>
                      <div className="relative group">
                        {editField === "aadhar_no" ? (
                          <Input
                            id="aadhar"
                            type="text"
                            value={formData.aadhar_no ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                aadhar_no: e.target.value,
                              })
                            }
                            className="w-full mt-1 border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.aadhar_no}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(
                              editField === "aadhar_no" ? null : "aadhar_no"
                            )
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit aadhar"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </Field>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <Field>
                      <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
                      <div className="relative group">
                        {editField === "dob" ? (
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="dob"
                                name="dob"
                                value={formData.dob ?? ""}
                                className="w-full md:w-48 flex justify-between font-normal cursor-pointer"
                              >
                                {formData.dob
                                  ? format(formData.dob, "dd-MM-yyyy")
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
                                selected={formData.dob}
                                onSelect={(selectedDate) => {
                                  const calculatedAge =
                                    calculateAge(selectedDate);

                                  setFormData((prev) => ({
                                    ...prev,
                                    dob: selectedDate,
                                    age: calculatedAge,
                                  }));

                                  setOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {formatDOB(voter?.dob)}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(editField === "dob" ? null : "dob")
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit dob"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="age">Age</FieldLabel>
                      <div className="relative group">
                        {isAgeCalculate ? (
                          <p className="w-full text-left mt-1 border rounded px-2 py-1">
                            {formData?.age}
                          </p>
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.age}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(editField === "age" ? null : "age")
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit age"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
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
                      <div className="relative group">
                        {editField === "prabhag_no" ? (
                          <Input
                            id="prabhagNo"
                            type="text"
                            value={formData.prabhag_no ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                prabhag_no: e.target.value,
                              })
                            }
                            className="w-full mt-1 border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.prabhag_no}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(
                              editField === "prabhag_no" ? null : "prabhag_no"
                            )
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit prabhag"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="houseNo">House No.</FieldLabel>
                      <div className="relative group">
                        {editField === "house_no" ? (
                          <Input
                            id="houseNo"
                            type="text"
                            value={formData.house_no ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                house_no: e.target.value,
                              })
                            }
                            className="w-full mt-1 border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.house_no}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(
                              editField === "house_no" ? null : "house_no"
                            )
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit house"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
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
                      <FieldLabel htmlFor="religion">Religion</FieldLabel>
                      <div className="relative group">
                        {editField === "religion" ? (
                          <Input
                            id="religion"
                            type="text"
                            value={formData.religion ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                religion: e.target.value,
                              })
                            }
                            className="w-full mt-1 border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.religion}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(
                              editField === "religion" ? null : "religion"
                            )
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit religion"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="category">Category</FieldLabel>
                      <div className="relative group">
                        {editField === "category" ? (
                          <Input
                            id="category"
                            type="text"
                            value={formData.category ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.value,
                              })
                            }
                            className="w-full mt-1 border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-gray-900 mt-1 text-left">
                            {voter?.category}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setEditField(
                              editField === "category" ? null : "category"
                            )
                          }
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition p-1"
                          aria-label="Edit category"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </Field>
                  </div>
                </FieldSet>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <Field orientation="vertical">
              <Button type="submit" className="cursor-pointer">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Submitting Details..." : "Submit Updated Details"}
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  setFormData({ ...voter, dob: toInputDate(voter?.dob) });
                  setEditField(null);
                }}
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">
            Please log in to access the Voter Registration Page.
          </p>
          <p>Redirecting to Login Page... </p>
          {setTimeout(() => {
            navigate("/auth");
            toast.warning(
              <b>Your session has expired!!</b> +
                "Please login to access Voter Registration Page"
            );
          }, 2000)}
        </div>
      )}
    </div>
  );
};

export default VoterProfile;

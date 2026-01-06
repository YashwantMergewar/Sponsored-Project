import { changeUserPassword } from "@/api/user/userApi";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const handleOnChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        await changeUserPassword(data);
        setData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
        toast.success("Admin Password Successfully Updated..!")
    } catch (error) {
        toast.error(error.message || "Admin Password Updation failed");
        console.log(error);
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-sm">
    <form onSubmit={handleOnSubmit}>
      <FieldGroup orientation="vertical" className="space-y-6">
        <FieldSet>
          <FieldLegend>Change Admin Password</FieldLegend>
          <FieldSeparator />
          <Field>
            <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
            <div className="relative">
              <Input
                id="oldPassword"
                type={oldPasswordVisible ? "text" : "password"}
                name="oldPassword"
                value={data.oldPassword}
                placeholder="Enter your old password"
                onChange={handleOnChange}
                required
              />
              <button
                type="button"
                onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors"
                disabled={loading}
                tabIndex={-1}
              >
                {oldPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <div className="relative">
              <Input
                id="newPassword"
                type={newPasswordVisible ? "text" : "password"}
                name="newPassword"
                value={data.newPassword}
                placeholder="Enter your new password"
                onChange={handleOnChange}
                required
              />
              <button
                type="button"
                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors"
                disabled={loading}
                tabIndex={-1}
              >
                {newPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Repeate your new password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors"
                disabled={loading}
                tabIndex={-1}
              >
                {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>
        </FieldSet>
        <FieldSeparator />

        <Field orientation="vertical">
          <Button type="submit" className="cursor-pointer">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Submitting Details..." : "Submit Details"}
          </Button>
          <Button variant="outline" type="button" className="cursor-pointer">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
    </div>
  );
};

export default ChangePasswordPage;

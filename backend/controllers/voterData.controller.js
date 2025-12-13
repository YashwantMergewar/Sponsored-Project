import conn from "../config/db";
import { asyncHandler } from "../utils/asyncHandler";
import { voterRegistrationSchema, voterUpdateSchema } from "../utils/validationSchema/voterValidationSchema";

const voterRegistration = asyncHandler(async (req, res) => {
    const validateData = voterRegistrationSchema.safeParse(req.body)
    try {
        if(!fullname || !email || !head_of_family || !mobile_no || !aadhar_no || !dob || !age || !religion || !caste || !category || !prabhag_no){
            return res.status(400).json({
                message: "All fields are required..!"
            })
        }
    
    
        if(!validateData){
            return res.status(400).json({
                message: "Invalid data provided..!"
            })
        }
    
        const result = await conn.query('insert into voters (fullname, email, head_of_family, mobile_no, aadhar_no, dob, age, religion, caste, category, prabhag_no, house_no) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ fullname, email, head_of_family, mobile_no, aadhar_no, dob, age, religion, caste, category, prabhag_no, house_no ])
    
        if(result.affectedRows === 0){
            return res.status(500).json({
                message: "Unable to register voter..!"
            })
        }
    
        return res.status(201).json({
            message: "Voter registered successfully..!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Unable to register voter..!"
        })
    }
})

const getVoters = asyncHandler(async (req, res) => {
    const [result] = await conn.query('select * from voters order by voter_id desc');

    if(result.length === 0){
        return res.status(404).json({
            message: "No voters found..!"
        })
    }

    return res.status(200).json({
        message: "Voters fetched successfully..!",
        voters: result
    })
})

const updateVoter = asyncHandler(async (req, res) => {
    const { voter_id } = req.params;
    const validateData = voterUpdateSchema.safeParse(req.body)

    try {
        if(!validateData){
            return res.status(400).json({
                message: "Invalid data provided..!"
            })
        }
    
        const allowedFields = {
            fullname: 'fullname',
            email: 'email',
            head_of_family: 'head_of_family',
            mobile_no: 'mobile_no',
            aadhar_no: 'aadhar_no',
            dob: 'dob',
            age: 'age',
            religion: 'religion',
            caste: 'caste',
            category: 'category',
            prabhag_no: 'prabhag_no',
            house_no: 'house_no'
        }
    
        let fields = []
        let values = []
    
        for(const key in allowedFields){
            const value = req.body[key]
            if(value !== undefined && value !== null
                && (typeof value === 'string' || value.trim() !== '')
            ){
                fields.push(`${allowedFields[key]} = ?`);
                values.push(value);
            }
        }
    
        if(fields.length === 0){
            return res.status(400).json({
                message: "No valid fields provided for update..!"
            })
        }
    
        values.push(voter_id);
        const sql = `update voters set ${fields.join(', ')} where voter_id = ?`;
    
        const result = await conn.query(sql, values)
    
        if(result.affectedRows === 0){
            return res.status(404).json({
                message: "Voter not found or no changes made..!"
            })
        }
    
        return res.status(200).json({
            message: "Voter updated successfully..!",
            voter_id: voter_id,
            updatedData: result
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Unable to update voter..!"
        })
    }

})

const deleteVoter = asyncHandler(async (req, res) => {
    const { voter_id } = req.params;

    const result = await conn.query('delete from voters where voter_id = ?', [voter_id])

    if(result.affectedRows === 0){
        return res.status(404).json({
            message: "voter not found..!"
        })
    }

    return res.status(200).json({
        message: "voter deleted successfully..!"
    })
})

export {
    voterRegistration,
    getVoters,
    updateVoter,
    deleteVoter
}
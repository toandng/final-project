import {z} from 'zod'
const configSchme = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string()
})

const configProject = configSchme.safeParse(process.env)

if(!configProject.success) {
    console.error(configProject.error.issues)
    throw new Error('Các giá trị khai báo không hợp lệ')
}
export const envConfig = configProject.data
export default envConfig
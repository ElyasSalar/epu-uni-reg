import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "next-i18next"
import { formatBytes } from "../../lib/general"
import TelegramApi from "../../endpoints/telegram"
import AuthController from "../../controller/auth"
import { ROUTES } from "../../shared/constants/routes"
import StudentsRepository from "../../repositories/students"
import DashboardLayout from "../../components/DashboardLayout"
import { generateFileIdsFromStudent } from "../../lib/students"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import DownloadFileIcon from "../../assets/icons/download-file.svg"

import type { NextPage, GetServerSidePropsContext } from "next"
import type { GetStudentDetails, Student } from "../../types/student"
import type { Locale } from "../../types/locales"
import Head from "next/head"

const StudentDetails: NextPage<{ student: GetStudentDetails, userFullName: string }> = ({ student, userFullName }) => {
  const { t } = useTranslation("student-details")

  const documentLinks = useMemo(() => generateFileIdsFromStudent(student), [student])

  const [documents, setDocuments] = useState<{
    url?: string
    name: string
    fileId: string
    fileSize: number
    isLoaded: boolean
  }[]>(
    documentLinks.map((document) => ({
      ...document,
      isLoaded: false,
      fileSize: 0,
      url: "",
    }))
  )

  useEffect(() => {
    documentLinks.forEach(({ fileId }, index) => {
      if (!fileId) return
      TelegramApi.getFile(fileId).then(({ data }) => {
        console.log(data)
        setDocuments((prev) => {
          return [
            ...prev.slice(0, index),
            {
              ...prev[index],
              isLoaded: true,
              fileSize: data.result.file_size || 0,
              url: TelegramApi.getFileUrl(data.result.file_path),
            },
            ...prev.slice(index + 1),
          ]
        })
      })
    })
  }, [documentLinks])
  
  return (
    <DashboardLayout userName={userFullName}>
      <Head>
        <title>Student - {student.firstName}</title>
      </Head>
      <main className="student-details">
        <div className="student-details__profile">
          <h3 className="student-details__profile-title">{t("studentdetails_information_title")}</h3>
          <div className="student-details__profile-content">
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_name")}</label>
              <p className="student-details__profile-value">
                {"".concat(student.firstName, " ", student.secondName, " ", student.thirdName)}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_serialnumber")}</label>
              <p className="student-details__profile-value">
                {student.serialNumber}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_collage")}</label>
              <p className="student-details__profile-value">
                {student.collage}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_department")}</label>
              <p className="student-details__profile-value">
                {student.department}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_nationality")}</label>
              <p className="student-details__profile-value">
                {student.nationality}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_language")}</label>
              <p className="student-details__profile-value">
                {student.language}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_religion")}</label>
              <p className="student-details__profile-value">
                {student.religion}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_personalphonenumber")}</label>
              <p className="student-details__profile-value">
                {student.phoneNumber}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_familyphonenumber")}</label>
              <p className="student-details__profile-value">
                {student.familyPhoneNumber}
              </p>
            </div>
            <div className="student-details__profile-info">
              <label className="student-details__profile-label">{t("studentdetails_information_email")}</label>
              <p className="student-details__profile-value">
                {student.email}
              </p>
            </div>
          </div>
        </div>
        <div className="student-details__documents">
          <h3 className="student-details__documents-title">{t("studentdetails_documents_title")}</h3>
          {documents.filter(({ isLoaded }) => isLoaded).map(({ fileId, name, fileSize, url }) => (
            <div key={fileId} className="student-details__document">
              <div className="student-details__document-info">
                <h4 className="student-details__document-title">{t(name)}</h4>
                <p className="student-details__document-subtitle">{formatBytes(fileSize)}</p>
              </div>
              <a href={url} className="button student-details__document-download">
                <DownloadFileIcon className="student-details__document-download-icon" /> {t("studentdetails_documents_download_button")}
              </a>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  )
}

export default StudentDetails

export async function getServerSideProps({
  locale,
  params,
  req,
}: GetServerSidePropsContext<{ studentId: string }> & { locale: Locale }) {
  const getRedirectTo = (path: string) => ({
    redirect: {
      destination: path,
      permanent: false,
      locale
    },
  })
  if (req.cookies.accessToken === undefined) return getRedirectTo(ROUTES.students.login.path)

  const user = await AuthController.isAuthenticated(`Bearer ${req.cookies.accessToken}`)
  
  if (user === null) return getRedirectTo(ROUTES.students.login.path)

  const studentId = params?.studentId
  if (studentId === undefined) return getRedirectTo(ROUTES.students.path)
  
  let student: Student
  try {
    student = await StudentsRepository.getStudentById(studentId)
  } catch (error) {
    return getRedirectTo(ROUTES.students.path)
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "student-details"])),
      student: JSON.parse(JSON.stringify(student)),
      userFullName: user.name,
    },
  }
}
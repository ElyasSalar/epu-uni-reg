import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import NoData from "../../components/NoData"
import { useTranslation } from "next-i18next"
import { translateNumber } from "../../lib/locale"
import SearchBar from "../../components/SearchBar"
import AuthController from "../../controller/auth"
import Pagination from "../../components/Pagination"
import { ROUTES } from "../../shared/constants/routes"
import { LOCALE_DIR } from "../../shared/constants/locale"
import DashboardLayout from "../../components/DashboardLayout"
import { deleteStudentById, getStudents } from "../../endpoints/students"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { STUDENTS_TABLE_HEADER } from "../../shared/constants/dashboard/students"

import Alert from "@mui/material/Alert"
import Dialog from '@mui/material/Dialog'
import Snackbar from "@mui/material/Snackbar"
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import TrashIcon from "../../assets/icons/trash.svg"

import type { GetStudentsApiResponse } from "../../types/student"
import type { NextPage, GetServerSidePropsContext } from "next"
import type { WithPagination } from "../../types/general"
import type { Locale } from "../../types/locales"
import type { AlertColor } from "@mui/material"
import type { MouseEventHandler } from "react"
import type { User } from "../../types/user"

const Students: NextPage<{ user: User }> = ({ user }) => {
  const studentDeleteDialog = useRef<{
    name: string,
    id: string,
  }>({ name: "", id: "" })
  const router = useRouter()
  const { t } = useTranslation("students")
  const [page, setPage] = useState<number>(0)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean,
    message: string,
    type: AlertColor
  }>({ open: false, message: "", type: "info" })
  const [students, setStudents] = useState<WithPagination<GetStudentsApiResponse>>({
    content: [],
    totalPages: 0,
    page: 0,
    size: 0,
    totalElements: 0,
  })
  const [searchQuery, setSearchQuery] = useState<string>("")

  const fetchStudents = useCallback(() => {
    getStudents({
      searchQuery, 
      size: 9,
      page,
    }).then(({ data }) => {
      setStudents(data)
    }).catch(console.error)
  }, [page, searchQuery])

  const handlePageChange = (page: { selected: number }) => {
    setPage(page.selected)
  }

  const handleStudentDeleteClick = ({
    id,
    name
  }: {
    id: string
    name: string
  }): MouseEventHandler<HTMLButtonElement> => (event) => {
    event.stopPropagation()
    studentDeleteDialog.current = { id, name }
    setIsDialogOpen(true)
  }

  const handleCancelStudentDeletion =  () => {
    studentDeleteDialog.current = {
      name: "",
      id: "",
    }
    setIsDialogOpen(false)
  }

  const handleDeleteStudent =  async () => {
    try {
      await deleteStudentById(studentDeleteDialog.current.id)
      setSnackbarState({
        open: true,
        type: "success",
        message: t("students_delete_student_success_message"),
      })
      fetchStudents()
    } catch(error) {
      setSnackbarState({
        open: true,
        type: "error",
        message: t("students_delete_student_error_message"),
      })
    }
    setIsDialogOpen(false)
  }

  const handleRowClick = (id: string) => () => {
    router.push(ROUTES.students.details.path.replace(":studentId", id))
  }

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])
  
  return (
    <DashboardLayout userName={user.name}>
      <main className="students">
        <div className="students__header">
          <h1 className="students__title">{t("students_title")}</h1>
          <h3 className="students__total">{t("students_total", {
            totalStudents: translateNumber(students.totalElements, router.locale),
          })}</h3>
        </div>
        <div className="students__table-container">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={t("students_search_placeholder")}
          />

          {students.content.length === 0 && <NoData />}
          {students.content.length > 0 && (
            <>
              <table className="students__table">
                <thead>
                  <tr>
                    {STUDENTS_TABLE_HEADER.map(({ translationKey }) => (
                      <th key={translationKey}>{t(translationKey)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.content.map(({
                    id,
                    firstName,
                    secondName,
                    thirdName,
                    department,
                    collage,
                    phoneNumber,
                    serialNumber,
                  }) => (
                    <tr key={id} onClick={handleRowClick(id)}>
                      <td>{"".concat(firstName, " ", secondName, " ", thirdName)}</td>
                      <td>{serialNumber}</td>
                      <td>{collage}</td>
                      <td>{department}</td>
                      <td>{phoneNumber}</td>
                      <td>
                        <button
                          type="button"
                          onClick={handleStudentDeleteClick({ id, name: firstName })}
                          className="button students__table-action-button"
                        >
                          <TrashIcon className="students__table-action-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination totalPages={students.totalPages} setPage={handlePageChange} />
            </>
          )}
        </div>
        <Snackbar
          open={snackbarState.open}
          message={snackbarState.message}
          onClose={() => setSnackbarState({
            open: false,
            message: "",
            type: "info",
          })}
        >
          <Alert severity={snackbarState.type}>{snackbarState.message}</Alert>
        </Snackbar>
        <Dialog
          open={isDialogOpen}
          dir={LOCALE_DIR[router.locale]}
          aria-labelledby="delete student"
          onClose={() => setIsDialogOpen(false)}
          aria-describedby="delete student dialog"
        >
          <DialogTitle className="students__dialog-title">{t("students_delete_student_dialog_title")}</DialogTitle>
          <DialogContent>
            <DialogContentText className="students__dialog-description">
              {t("students_delete_student_dialog_description", {
                name: studentDeleteDialog.current.name,
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="students__dialog-actions">
            <button
              type="button"
              onClick={handleCancelStudentDeletion}
              className="button students__dialog-negative"
            >{t("students_delete_student_dialog_negative_button")}</button>
            <button
              type="button"
              onClick={handleDeleteStudent}
              className="button students__dialog-positive"
            >{t("students_delete_student_dialog_positive_button")}</button>
          </DialogActions>
        </Dialog>
      </main>
    </DashboardLayout>
  )
}

export default Students

export async function getServerSideProps({ locale, req }: GetServerSidePropsContext & { locale: Locale }) {
  const redirectToLogin = {
    redirect: {
      destination: ROUTES.students.login.path,
      permanent: false,
      locale,
    },
  }
  if (req.cookies.accessToken === undefined) return redirectToLogin

  const user = await AuthController.isAuthenticated(`Bearer ${req.cookies.accessToken}`)
  
  if (user === null) return redirectToLogin

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "students"])),
      user,
    },
  }
}
import React, { useState, useEffect } from 'react'
import { Backdrop, Box, Fade } from '@mui/material'
import { Formik } from 'formik'
import { v4 } from 'uuid'
import { fromError, useMutation, useReactiveVar } from '@apollo/client'
import { UPDATE_BAND_MUTATION } from '../../../apollo/mutation/band'
import { userInfoVar } from '../../../reactiveVars'
import { storage } from '../../../utils/firebaseInit'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { DetailModal } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import { IFormValues } from '../CreateBandModal/CreateBandModal'
import { shouldRefetchTracks } from '../../../reactiveVars'
import { IHandleFormSubmit } from '../CreateBandModal/CreateBandModal'
import BandForm from '../Forms/BandForm'
import { ISelectedBand } from '../../Table/TableComponents/TableBodyContent'
import LoaderOval from '../../UI/Loader/LoaderOval'
import { bandValidationSchema } from '../../../validations/bandValidationSchema'

interface ITrackDetails {
  handleCloseModal: () => void
  openModal: boolean
  selectedBand: ISelectedBand
  bandLoading: boolean
}

const BandDetailsModal = (props: ITrackDetails) => {
  const { handleCloseModal, openModal, selectedBand, bandLoading } = props

  useEffect(() => {
    return () => {
      shouldRefetchTracks(false)
    }
  }, [])

  const [selectedImg, setSelectedImg] = useState<File | null>(null)
  const userData = useReactiveVar(userInfoVar)
  const [updateBandMutation] = useMutation(UPDATE_BAND_MUTATION)

  const handleFormSubmit: (
    values: IFormValues,
    { setValues }: IHandleFormSubmit,
  ) => Promise<void> = async values => {
    try {
      let bandCoverImage = ''
      if (selectedImg) {
        const imageRef = ref(storage, `images/user/${userData.id}/band/${selectedImg.name + v4()}`)
        await uploadBytes(imageRef, selectedImg)
        bandCoverImage = await getDownloadURL(imageRef)
      }

      await updateBandMutation({
        variables: { input: { ...values, image: bandCoverImage } },
      })
      shouldRefetchTracks(true)
      handleCloseModal()
    } catch (serverError) {
      console.error('Band update error', fromError(serverError))
    }
  }

  return (
    <DetailModal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box component="div">
          {bandLoading ? (
            <LoaderOval height={30} width={30} />
          ) : (
            <Formik
              initialValues={selectedBand}
              validationSchema={bandValidationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => {
                return (
                  <BandForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    setSelectedImg={setSelectedImg}
                    values={values}
                    errors={errors}
                    touched={touched}
                    isBandEditing
                    tracksTitleText="Add and edit tracks in band"
                    coverTitleText="Add or edit cover image for band"
                  />
                )
              }}
            </Formik>
          )}
        </Box>
      </Fade>
    </DetailModal>
  )
}

export default BandDetailsModal

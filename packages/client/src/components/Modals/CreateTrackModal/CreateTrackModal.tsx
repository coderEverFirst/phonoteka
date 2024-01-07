import React, { useEffect } from 'react'
import { Backdrop, Box, Fade } from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { fromError, useMutation, useQuery } from '@apollo/client'
import { CREATE_TRACKS_MUTATION } from '../../../apollo/mutation/band'
import { GET_ALL_BANDS_QUERY } from '../../../apollo/queries/band'
import { createTrackSchema } from '../../../validations/createTrackSchema'
import { DetailModal } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import CreateTrackForm from './CreateTrackForm'
import { wasTracksCreated } from '../../../reactiveVars'
import '../CreateBandModal/CreateBandModal.scss'

export interface IFormValues {
  bandId: number
  tracks: Array<{
    name: string
    album: string
    year: string
    format: string
    url: string
    genre: string
  }>
}

interface IHandleFormSubmit {
  setValues: (
    values: React.SetStateAction<IFormValues>,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<IFormValues>>
}

interface ICreateTrackModal {
  handleCloseModal: (state: boolean) => void
  openModal: boolean
}

const CreateTrackModal = (props: ICreateTrackModal) => {
  const { handleCloseModal, openModal } = props

  useEffect(() => {
    return () => {
      wasTracksCreated(false)
    }
  }, [])

  const [createTracksMutation] = useMutation(CREATE_TRACKS_MUTATION)
  const { data: bandsData, loading: bandsLoading } = useQuery(GET_ALL_BANDS_QUERY)
  const handleFormSubmit: (
    values: IFormValues,
    { setValues }: IHandleFormSubmit,
  ) => Promise<void> = async values => {
    try {
      await createTracksMutation({
        variables: { input: values },
      })
      handleCloseModal(false)
      wasTracksCreated(true)
    } catch (serverError) {
      console.error('Band creation error', fromError(serverError))
    }
  }

  return (
    <DetailModal
      open={openModal}
      onClose={() => handleCloseModal(false)}
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
          <Formik
            initialValues={{
              bandId: 0,
              tracks: [{ name: '', album: '', year: '', format: '', url: '', genre: '' }],
            }}
            validationSchema={createTrackSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => {
              return (
                <CreateTrackForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  errors={errors}
                  touched={touched}
                  bandsData={bandsData?.getAllBands}
                  bandsLoading={bandsLoading}
                />
              )
            }}
          </Formik>
        </Box>
      </Fade>
    </DetailModal>
  )
}

export default CreateTrackModal

import React from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Card,
  Link as A,
  Text,
  Avatar,
  Grid
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Sponsors from '../components/donate/sponsors'
import donors from '../components/donate/donors.json'
import locations from '../components/donate/locations'
import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

const title = 'Donate'
const desc =
  'Contribute today to empower the next generation and help start a coding club at every high school.'

export default function Donate() {
  const canvasRef = useRef()
  useEffect(() => {
    let phi = 0

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 900 * 2,
      height: 900 * 2,
      phi: 0,
      theta: 0.14,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.3, 0.3, 0.3],
      markers: locations.map(location => ({ location: [location[0], location[1]], size: 0.03 })),
      onRender: state => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi
        phi += 0.01
      }
    })

    return () => {
      globe.destroy()
    }
  }, [])
  return (
    <Box>
      <Meta
        as={Head}
        title={title}
        description={desc}
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <Nav color="muted" />
      <ForceTheme theme="light" />
      <Grid
        columns={'1fr 1fr'}
        sx={{
          position: 'relative',
          bg: 'darker',
          height: '900px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Box sx={{ maxWidth: '600px' }}>
            <Heading color="white" sx={{ fontSize: 6, my: 2 }}>
              We rely on people like you to bring coding to the world.
            </Heading>
            <Heading
              sx={{ color: 'white', fontWeight: 400, fontSize: '28px' }}
              as="h2"
            >
              Contribute today to empower the next generation. Help start a Hack
              Club at every high school.
            </Heading>
            <Button
              as="a"
              href="https://bank.hackclub.com/donations/start/hq"
              width={1}
              chevronRight
              inverted
              sx={{
                width: '100%',
                color: 'white',
                bg: 'red',
                py: 2,
                my: 3,
                borderRadius: 12,
                width: 'fit-content',
                display: 'block',
                fontSize: 3,
                textTransform: 'none'
              }}
            >
              Donate to Hack Club »
            </Button>
            <Text color="white">
            Your contribution is tax-deductible. <br />
Hack Club is a 501(c)(3) non-profit with the EIN 81-2908499.
            </Text>

          </Box>
        </Box>
        <Box>
          <canvas ref={canvasRef} style={{ width: 900, height: 900 }} />
        </Box>
      </Grid>
      <Footer />
    </Box>
  )
}

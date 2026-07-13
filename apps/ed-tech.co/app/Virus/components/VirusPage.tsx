"use client";
import React from "react";
import {useRouter} from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getFirebaseFirestore } from "../utils/firebase";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import {
  Box,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { CleverText, Icon, navigateTo } from "../../NX/DesignSystem";
import { useDispatch } from "../../NX/Uberedux";
import Score from "./Score";
import moment from "moment";

export default function VirusPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const fsId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [virus, setVirus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const hasIncremented = useRef(false);
  useEffect(() => {
    if (!fsId) return;
    const firestore = getFirebaseFirestore();
    const ref = doc(firestore, "viruses", fsId);
    if (typeof window !== 'undefined' && !hasIncremented.current) {
      hasIncremented.current = true;
      updateDoc(ref, { score: increment(1) }).catch(() => {});
    }
    const unsub = onSnapshot(ref, (snapshot) => {
      setVirus(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
      setLoading(false);
    });
    return () => unsub();
  }, [fsId]);

  return (
    <Box>
      {loading && <Typography>Loading...</Typography>}
      {!loading && virus && (
        <Box sx={{  }}>

          <Box sx={{display: 'flex', gap: 1, mb: 2}}>
            <Box sx={{flexGrow:1}} />
            <Button
              variant="outlined"
              startIcon={<Icon icon="virus" />}
              onClick={() => {
                dispatch(navigateTo(router, '/viruses'));
              }}
            >
              Viruses°
            </Button>
            <Button
              variant="outlined"
              startIcon={<Icon icon="new" />}
              onClick={() => {
                dispatch(navigateTo(router, '/viruses/new'));
              }}
            >
              New
            </Button>
          </Box>
          
          <CardHeader
            action={
              <IconButton color="primary" onClick={() => window.history.back()}>
                <Icon icon="left" />
              </IconButton>
            }
            avatar={
              <Score score={virus.score ?? 0} />
            }
            title={<Typography variant="body1">{virus.name}</Typography>}
            subheader={<Typography variant="body2" color="text.secondary">
                        born {virus.created ? moment(virus.created).fromNow() : ''}
                        </Typography>}
          />
          <CardContent>
            <CleverText options={{
              markdown: virus.message,
              id: virus.id,
              onFinish: () => {
                console.log('Finished rendering markdown for virus', virus.id);
              }
            }} />
            
          </CardContent>
        </Box>
      )}
      {!loading && !virus && (
        <Typography color="text.secondary">No data found.</Typography>
      )}
    </Box>
  );
}
import {
    MediaRenderer,
    useMarketplace,
    useNetwork,
    useNetworkMismatch,
  } from "@thirdweb-dev/react";
  import Header3 from "../../components/Header3";
  import {
    AuctionListing,
    ChainId,
    DirectListing,
    ListingType,
    NATIVE_TOKENS,
  } from "@thirdweb-dev/sdk";
  import type { NextPage } from "next";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { AiFillHeart } from 'react-icons/ai'
  import { MdRefresh } from 'react-icons/md'
  import { RiShareBoxLine } from 'react-icons/ri'
  import { FiMoreVertical } from 'react-icons/fi'
  import { GiShare } from 'react-icons/gi'

import ItemActivity from './../../components/ItemActivity';

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,

  infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
  accent: `text-[#2081e2]`,
  nftTitle: `text-3xl font-extrabold`,
  otherInfo: `flex`,
  ownedBy: `text-[#8a939b] mr-4`,
  likes: `flex items-center text-[#8a939b]`,
  likeIcon: `mr-1`,
  actionButtonsContainer: `w-44`,
  actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `my-2`,
  divider: `border-r-2`,
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}
const ListingPage: NextPage = () => {
    
    const router = useRouter();
  
    const { listingId } = router.query as { listingId: string };
  
    const [loadingListing, setLoadingListing] = useState<boolean>(true);
  
    const [bidAmount, setBidAmount] = useState<string>("");
  
    const [listing, setListing] = useState<
      undefined | DirectListing | AuctionListing
    >(undefined);
  
    const marketplace = useMarketplace(
      "0xF684CDd7AEA8B98B488CaDDb72e1B9c881EC08c4" 
    );
  
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
  
    useEffect(() => {
      if (!listingId || !marketplace) {
        return;
      }
      (async () => {
        const l = await marketplace.getListing(listingId);
  
        setLoadingListing(false);
        setListing(l);
      })();
    }, [listingId, marketplace]);
  
    if (loadingListing) {
      return <div >Loading...</div>;
    }
  
    if (!listing) {
      return <div >Listing not found</div>;
    }
  
    async function createBidOrOffer() {
      try {
        if (networkMismatch) {
          switchNetwork && switchNetwork(4);
          return;
        }
  
        if (listing?.type === ListingType.Direct) {
          await marketplace?.direct.makeOffer(
            listingId, 
            1, 
            NATIVE_TOKENS[ChainId.Goerli].wrapped.address, 
            bidAmount 
          );
        }
  
        if (listing?.type === ListingType.Auction) {
          await marketplace?.auction.makeBid(listingId, bidAmount);
        }
  
        alert(
          `${
            listing?.type === ListingType.Auction ? "Bid" : "Offer"
          } created successfully!`
        );
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    async function buyNft() {
      try {
    
        if (networkMismatch) {
          switchNetwork && switchNetwork(4);
          return;
        }
  
        await marketplace?.buyoutListing(listingId, 1);
        alert("NFT bought successfully!");
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    return (
      <div className={style.wrapper}>
        
    <Header3 />
    <div style={{ marginTop: 90, marginBottom: 50 }}></div>
    
         <div className={style.container}> 
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
            <MediaRenderer
              src={listing.asset.image}
            
            />
            </div>
            <div className={style.detailsContainer}>
            <div className={style.wrapper}>
      <div className={style.infoContainer}>
        <div className={style.accent}>Bored Ape Yacht Club</div>
        <div className={style.nftTitle}>{listing.asset.name}</div>
        <div className={style.otherInfo}>
          <div className={style.ownedBy}>
            Owned by <span className={style.accent}>{listing.sellerAddress?.slice(0, 6) +
                  "..." +
                  listing.sellerAddress?.slice(36, 40)}</span>
          </div>
          <div className={style.likes}>
            <AiFillHeart className={style.likeIcon} /> 2.3K favorites
          </div>
        </div>
      </div>
      <div className={style.actionButtonsContainer}>
        <div className={style.actionButtons}>
          <div className={`${style.actionButton} ml-2`}>
            <MdRefresh />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <RiShareBoxLine />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <GiShare />
          </div>
          <div className={style.divider} />
          <div className={`${style.actionButton} mr-2`}>
            <FiMoreVertical />
          </div>
        </div>
        <div
              className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
            >
              <button
               className={style.buttonIcon}
                
                onClick={buyNft}
              >
                Buy
              </button>
              
               
                
              </div>
      </div>
    </div>
            </div>
          </div>
          <ItemActivity />
        </div>
      
      </div>
    );
  };
  
  export default ListingPage;
  
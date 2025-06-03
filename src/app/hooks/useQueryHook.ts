import { useCallback } from "react";
import { useHttp } from "./useHttp";
import { useQuery, useMutation, useQueryClient } from "react-query";


export const useQueryHook = () => {
    // const {fetchHeroes, deleteHero, fetchFilters, addHero} = useHttp();
    const {fetchMenu} = useHttp(0);
    

    const menuState = useQuery({
        queryKey:['menu'],
        queryFn: fetchMenu,
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });
    

    // const deleteHeroMutation = useCallback(
    //     useMutation({
    //         mutationFn: deleteHero,
    //         // onSuccess: () => {
    //         //     queryClient.invalidateQueries(['heroes']);
    //         // },
    // }),[queryClient, deleteHero])

    // const addHeroMutation = useMutation({
    //     mutationFn: addHero,
    //     onSuccess: () => {
    //        queryClient.invalidateQueries(['heroes']);}
    //     })

    // const filtersState = useQuery(
    //         'filters',
    //         fetchFilters,
    //         {
    //             refetchOnWindowFocus: false,
    //             keepPreviousData: true
    //         }
    //     )

    return {
        menuState,
        // heroesState, 
        // deleteHeroMutation, 
        // filtersState, 
        // addHeroMutation
    };
};


